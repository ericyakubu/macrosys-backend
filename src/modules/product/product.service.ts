import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductReqDto } from './dto/create-product.dto';
import { PrismaService } from '@/prisma.service';
import { StorageService } from '@/shared/storage/storage.service';
import type { AuthUser } from '@/shared/types';
import { PRODUCT_SELECT } from './product.selects';
import { GetProductsResDto } from './dto/get-products.dto';
import { RoleEnum, Prisma } from '@/prisma/client';
import { UpdateProductReqDto } from './dto/update-product.dto';
import { AppException } from '@/shared/errors/app.exception';
import { ProductError } from './product.errors';
import { recalculateRecipesUsing } from '@/shared/nutrition/recalculate-recipes';
import { MACRO_FIELDS } from '@/shared/constants';
import { ProductDto } from './dto/product.dto';

// TODO: error handling, pagination, filtering, sorting

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly storage: StorageService,
  ) {}
  async create(
    dto: CreateProductReqDto,
    user: AuthUser,
    photo?: Express.Multer.File,
  ): Promise<ProductDto> {
    const { diet_ids, ...data } = dto;
    const photo_url = photo ? await this.storage.save(photo, 'products') : undefined;

    try {
      return await this.prisma.product.create({
        data: {
          ...data,
          photo_url,
          diets: diet_ids ? { connect: diet_ids.map((id) => ({ id })) } : undefined,
          ...(user.role === 'TRAINER' && { trainer: { connect: { id: user.id } } }),
          ...(user.role === 'USER' && { user: { connect: { id: user.id } } }),
        },
        select: {
          diets: { select: { id: true, name: true } },
          ...(user.role === 'TRAINER' && { owner_trainer_id: true }),
          ...(user.role === 'USER' && { owner_user_id: true }),
          ...PRODUCT_SELECT,
        },
      });
    } catch (error) {
      if (photo_url) await this.storage.remove(photo_url).catch(() => undefined); // don't leave an orphan file
      throw error;
    }
  }

  async findAll(user: AuthUser): Promise<GetProductsResDto> {
    const where = this.ownerFilter(user);

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        select: {
          diets: { select: { id: true, name: true } },
          ...(user.role === 'TRAINER' && { owner_trainer_id: true }),
          ...(user.role === 'USER' && { owner_user_id: true }),
          ...PRODUCT_SELECT,
        },
        // skip, take, orderBy go here once you add pagination
      }),
      this.prisma.product.count({ where }),
    ]);

    return { products, total };
  }

  async findOne(user: AuthUser, id: string): Promise<ProductDto> {
    return await this.prisma.product.findUniqueOrThrow({
      where: { id },
      select: {
        diets: { select: { id: true, name: true } },
        ...(user.role === 'TRAINER' && { owner_trainer_id: true }),
        ...(user.role === 'USER' && { owner_user_id: true }),
        ...PRODUCT_SELECT,
      },
    });
  }

  async update(id: string, body: UpdateProductReqDto, user: AuthUser): Promise<ProductDto> {
    await this.assertCanEdit(id, user);
    const macrosChanged = MACRO_FIELDS.some((field) => data[field] !== undefined);

    const { diet_ids, ...data } = body;
    if (diet_ids) await this.assertDietsExist(diet_ids);

    try {
      return await this.prisma.$transaction(async (tx) => {
        const product = await tx.product.update({
          where: { id },
          data: {
            ...data,
            // `set` replaces the whole list, which is what "update diets" means
            ...(diet_ids && { diets: { set: diet_ids.map((dietId) => ({ id: dietId })) } }),
          },
          select: {
            diets: { select: { id: true, name: true } },
            ...(user.role === 'TRAINER' && { owner_trainer_id: true }),
            ...(user.role === 'USER' && { owner_user_id: true }),
            ...PRODUCT_SELECT,
          },
        });
        if (macrosChanged) await recalculateRecipesUsing(tx, id);
        return product;
      });
    } catch (error) {
      // the product was deleted between the check and the update
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new AppException(ProductError.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      throw error; // unknown errors go to the filter: logged, answered as INTERNAL_ERROR
    }
  }

  async remove(id: string, user: AuthUser) {
    await this.assertCanEdit(id, user);
    const [inRecipes, inPlans] = await Promise.all([
      this.prisma.recipeIngredient.count({ where: { product_id: id } }),
      this.prisma.mealPlanItem.count({ where: { product_id: id } }),
    ]);

    if (inRecipes + inPlans === 0) {
      try {
        const product = await this.prisma.product.delete({
          where: { id },
          select: { photo_url: true },
        });
        if (product.photo_url) await this.storage.remove(product.photo_url).catch(() => undefined);
        return { archived: false };
      } catch (error) {
        // someone added it to a recipe after our check, so fall through and archive
        const inUse =
          error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003';
        if (!inUse) throw error;
      }
    }

    await this.prisma.product.update({ where: { id }, data: { archived_at: new Date() } });
    return { archived: true };
  }

  private ownerFilter(user: AuthUser): Prisma.ProductWhereInput {
    switch (user.role) {
      case RoleEnum.TRAINER:
        return { owner_trainer_id: user.id };
      case RoleEnum.USER:
        return { owner_user_id: user.id };
      default: // ADMIN, MODERATOR
        return { owner_user_id: null, owner_trainer_id: null };
    }
  }

  private async assertCanEdit(id: string, user: AuthUser): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: { id },
      select: { owner_user_id: true, owner_trainer_id: true, archived_at: true },
    });

    if (!product || product.archived_at) {
      throw new AppException(ProductError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isDefault = product.owner_user_id === null && product.owner_trainer_id === null;

    if (isDefault) {
      if (user.role !== RoleEnum.ADMIN) {
        throw new AppException(ProductError.NOT_EDITABLE, HttpStatus.FORBIDDEN);
      }
      return;
    }

    const isOwner =
      (user.role === RoleEnum.USER && product.owner_user_id === user.id) ||
      (user.role === RoleEnum.TRAINER && product.owner_trainer_id === user.id);

    if (!isOwner) {
      throw new AppException(ProductError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }

  private async assertDietsExist(ids: string[]): Promise<void> {
    const unique = [...new Set(ids)];
    const found = await this.prisma.diet.count({ where: { id: { in: unique } } });

    if (found !== unique.length) {
      throw new AppException(ProductError.DIET_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
