import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@/prisma/client';
import { PrismaService } from '@/prisma.service';
import type { UserFromRequest } from '@/shared/types';
import { formatMacrosAndRating } from '@/shared/utils';
import type { GetAllProductsDto } from './dto/get-product.dto';
import type {
  CreateProductReqDto,
  CreateProductResDto,
  ProductDto,
  UpdateProductResDto,
  UpdateProductReqDto,
} from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserProduct(id: string, user: UserFromRequest): Promise<ProductDto> {
    const product = await this.prismaService.userProduct.findUnique({
      where: { id, user_id: user.id },
      select: {
        id: true,
        barcode: true,
        name: true,
        description: true,
        rating: true,
        photo: true,
        calories: true,
        carbohydrates: true,
        fat: true,
        fiber: true,
        protein: true,
        sugar: true,
        created_at: true,
        diets: true,
      },
    });

    if (!product) throw new NotFoundException('Product not found');

    return {
      ...product,
      ...formatMacrosAndRating(product),
      photo: product.photo?.url,
      diets: product.diets.map((d) => ({
        id: d.id,
        name: d.name,
      })),
    };
  }

  async getAllUserProducts(
    queries: GetAllProductsDto,
    user: UserFromRequest,
  ): Promise<ProductDto[]> {
    const {
      calories_gte,
      calories_lte,
      carbohydrates_gte,
      carbohydrates_lte,
      fat_gte,
      fat_lte,
      fiber_gte,
      fiber_lte,
      protein_gte,
      protein_lte,
      rating_gte,
      rating_lte,
      sugar_gte,
      sugar_lte,
      sort_by,
      sort_order,
      photo,
    } = queries;
    const where: Prisma.UserProductWhereInput = {};
    const isSorting = sort_by && sort_order && sort_by !== 'created_at';

    // if (queries.search) {
    //   where.OR = [
    //     { name: { contains: queries.search } },
    //     { description: { contains: queries.search } },
    //   ];
    // }
    this.handleQuery(where, calories_gte, calories_lte, 'calories');
    this.handleQuery(where, carbohydrates_gte, carbohydrates_lte, 'carbohydrates');
    this.handleQuery(where, fat_gte, fat_lte, 'fat');
    this.handleQuery(where, fiber_gte, fiber_lte, 'fiber');
    this.handleQuery(where, protein_gte, protein_lte, 'protein');
    this.handleQuery(where, rating_gte, rating_lte, 'rating');
    this.handleQuery(where, sugar_gte, sugar_lte, 'sugar');

    const found = await this.prismaService.userProduct.findMany({
      where: { user_id: user.id, ...where },
      include: { diets: true, photo: photo ? { select: { url: true } } : undefined },
      ...(isSorting && { orderBy: { [sort_by]: sort_order } }),
      omit: {
        updated_at: true,
        user_id: true,
      },
    });

    const products = found.map((product) => ({
      ...product,
      ...formatMacrosAndRating(product),
      photo: product.photo?.url,
      diets: product.diets.map((d) => ({
        id: d.id,
        name: d.name,
      })),
    }));

    return products;
  }

  async createUserProduct(
    body: CreateProductReqDto,
    user: UserFromRequest,
  ): Promise<CreateProductResDto> {
    const dietIds = body.diets?.map((dietId: string) => ({ id: dietId }));
    const rating = this.calculateRating(body);
    try {
      const product = await this.prismaService.userProduct.create({
        data: { ...body, rating, user: { connect: { id: user.id } }, diets: { connect: dietIds } },
        include: { diets: true, photo: true },
        omit: {
          user_id: true,
        },
      });

      return {
        ...product,
        ...formatMacrosAndRating(product),
      };
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025')
        throw new BadRequestException('One or more diet IDs are invalid.');

      throw e;
    }
  }

  async updateUserProduct(
    id: string,
    body: UpdateProductReqDto,
    user: UserFromRequest,
  ): Promise<UpdateProductResDto> {
    const dietIds = body.diets?.map((dietId: string) => ({ id: dietId }));
    const product = await this.prismaService.userProduct.update({
      where: { id, user_id: user.id },
      data: { ...body, diets: { connect: dietIds } },
      include: { diets: true, photo: true },
      omit: {
        user_id: true,
      },
    });

    return {
      ...product,
      ...formatMacrosAndRating(product),
    };
  }

  private handleQuery(where, gte, lte, field) {
    if (gte || lte) {
      where[field] = {};

      if (gte !== undefined) {
        where[field].gte = gte;
      }

      if (lte !== undefined) {
        where[field].lte = lte;
      }
    }
  }

  // TODO: заглушка для подсчёта рэйтинга
  private calculateRating(product: CreateProductReqDto): number {
    const protein = Number(product.protein ?? 0);
    const calories = Number(product.calories ?? 0);

    const density = calories === 0 ? protein : protein / calories;

    // normalize (tune this constant later)
    const score01 = Math.min(density / 0.3, 1);
    // 0.3 = “very good protein density”

    return Math.round(score01 * 10 * 10) / 10;
  }
}
