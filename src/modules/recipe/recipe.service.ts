import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateRecipeReqDto, RecipeProductDto } from './dto/create-recipe.dto';
import type { AuthUser, Macros } from '@/shared/types';
import { PrismaService } from '@/prisma.service';
import { RoleEnum, Prisma } from '@/prisma/client';
import { AppException } from '@/shared/errors/app.exception';
import { RecipeError } from './recipe.errors';
import type { FoundProduct } from './recipe.types';
import type { UpdateRecipeReqDto } from './dto/update-product.dto';
import { DietResolverService } from '../diet/diet-resolver.service';
import type { GetRecipeReqDto } from './dto/get-recipe.dto';
import type { RecipeDto } from './dto/recipe.dto';
import { toRange } from '@/shared/utils/range';
import { RECIPE_SELECT, toRecipeDto } from './recipe.selects';

@Injectable()
export class RecipeService {
  constructor(
    private prisma: PrismaService,
    private diets: DietResolverService,
  ) {}
  async create(body: CreateRecipeReqDto, user: AuthUser): Promise<RecipeDto> {
    const { products, diet_ids, ...rest } = body;

    const usable = await this.getUsableProducts(products, user);
    const macros = this.calculateMacros(products, usable);
    const dietIds = diet_ids
      ? await this.diets.resolve(diet_ids)
      : this.diets.intersect(usable.map((p) => p.diets.map((d) => d.id)));

    const recipe = await this.prisma.recipe.create({
      data: {
        ...rest,
        ...macros,
        ...(user.role === RoleEnum.USER && { owner_user_id: user.id }),
        ...(user.role === RoleEnum.TRAINER && { owner_trainer_id: user.id }),
        diets: { connect: dietIds.map((id) => ({ id })) },
        ingredients: {
          createMany: {
            data: products.map((p) => ({
              product_id: p.id,
              grams: p.grams,
            })),
          },
        },
      },
      select: RECIPE_SELECT,
    });

    return toRecipeDto(recipe);
  }

  async findAll(queries: GetRecipeReqDto, user: AuthUser): Promise<RecipeDto[]> {
    const recipes = await this.prisma.recipe.findMany({
      where: {
        ...this.visibilityFilter(user),
        archived_at: null,
        prep_time: toRange(queries.prep_time),
        cook_time: toRange(queries.cook_time),
        servings: toRange(queries.servings),
        calories: toRange(queries.calories),
        protein: toRange(queries.protein),
        ...(queries.diets?.length
          ? { AND: queries.diets.map((id) => ({ diets: { some: { id } } })) }
          : {}),
      },
      ...(queries.limit && { take: queries.limit }),
      ...(queries.offset && { skip: queries.offset }),
      ...(queries.sort_by &&
        queries.sort_order && { orderBy: { [queries.sort_by]: queries.sort_order } }),
      select: RECIPE_SELECT,
    });

    return recipes.map(toRecipeDto);
  }

  async findOne(id: string, user: AuthUser): Promise<RecipeDto> {
    const recipe = await this.prisma.recipe.findUniqueOrThrow({
      where: {
        id,
        ...(user.role === RoleEnum.USER && { owner_user_id: user.id }),
        ...(user.role === RoleEnum.TRAINER && { owner_trainer_id: user.id }),
      },
      select: RECIPE_SELECT,
    });
    return toRecipeDto(recipe);
  }

  async update(id: string, body: UpdateRecipeReqDto, user: AuthUser) {
    await this.assertCanEdit(id, user);
    const { products, diet_ids, ...rest } = body;

    let replacement: Prisma.RecipeUpdateInput = {};
    let derivedDietIds: string[] | undefined;

    if (products) {
      const usable = await this.getUsableProducts(products, user);
      derivedDietIds = this.diets.intersect(usable.map((p) => p.diets.map((d) => d.id)));
      replacement = {
        ...this.calculateMacros(products, usable),
        ingredients: {
          deleteMany: {},
          createMany: { data: products.map((p) => ({ product_id: p.id, grams: p.grams })) },
        },
      };
    }

    const dietIds = diet_ids ? await this.diets.resolve(diet_ids) : derivedDietIds;

    try {
      return await this.prisma.recipe.update({
        where: { id },
        data: {
          ...rest,
          ...replacement,
          ...(dietIds && { diets: { set: dietIds.map((d) => ({ id: d })) } }),
        },
        include: { diets: { select: { id: true, name: true } } },
      });
    } catch (error) {
      // рецепт удалили между проверкой и обновлением
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new AppException(RecipeError.NOT_FOUND, HttpStatus.NOT_FOUND);
      }
      throw error; // остальное уйдёт в фильтр: залогируется и вернётся как INTERNAL_ERROR
    }
  }

  async remove(id: string, user: AuthUser) {
    await this.assertCanEdit(id, user);
    await this.prisma.recipe.update({ where: { id }, data: { archived_at: new Date() } });
    return { archived: true };
  }

  private canUse(
    p: { owner_user_id: string | null; owner_trainer_id: string | null },
    user: AuthUser,
  ): boolean {
    const isDefault = p.owner_user_id === null && p.owner_trainer_id === null;
    if (isDefault) return true; // дефолтные доступны всем (и только они доступны админу)

    return (
      (user.role === RoleEnum.USER && p.owner_user_id === user.id) ||
      (user.role === RoleEnum.TRAINER && p.owner_trainer_id === user.id)
    );
  }

  private visibilityFilter(user: AuthUser): Prisma.RecipeWhereInput {
    const isDefault = { owner_user_id: null, owner_trainer_id: null };

    switch (user.role) {
      case RoleEnum.USER:
        return { OR: [isDefault, { owner_user_id: user.id }] };
      case RoleEnum.TRAINER:
        return { OR: [isDefault, { owner_trainer_id: user.id }] };
      default: // ADMIN, MODERATOR
        return isDefault;
    }
  }

  private async getUsableProducts(
    products: RecipeProductDto[],
    user: AuthUser,
  ): Promise<FoundProduct[]> {
    const productIds = [...new Set(products.map((p) => p.id))];

    const found = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: {
        id: true,
        owner_user_id: true,
        owner_trainer_id: true,
        archived_at: true,
        calories: true,
        protein: true,
        fat: true,
        carbohydrates: true,
        fiber: true,
        sugar: true, // пригодятся для подсчёта КБЖУ рецепта
        diets: { select: { id: true, name: true } },
      },
    });

    const usable = found.filter((p) => !p.archived_at && this.canUse(p, user));
    const usableIds = new Set(usable.map((p) => p.id));
    const unavailable = productIds.filter((id) => !usableIds.has(id));

    if (unavailable.length > 0) {
      throw new AppException(RecipeError.INGREDIENT_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY, {
        product_ids: unavailable,
      });
    }

    return usable;
  }

  private calculateMacros(requested: RecipeProductDto[], found: FoundProduct[]): Macros {
    const macros: Macros = {
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
      sugar: 0,
    };

    for (const p of requested) {
      const foundProduct = found.find((f) => f.id === p.id);
      if (foundProduct) {
        const multiplier = p.grams / 100; // product macros are per 100 g

        macros.calories += Number(foundProduct.calories) * multiplier;
        macros.carbohydrates += Number(foundProduct.carbohydrates) * multiplier;
        macros.fat += Number(foundProduct.fat) * multiplier;
        macros.fiber += Number(foundProduct.fiber) * multiplier;
        macros.protein += Number(foundProduct.protein) * multiplier;
        macros.sugar += Number(foundProduct.sugar) * multiplier;
      }
    }

    return macros;
  }

  private async assertCanEdit(id: string, user: AuthUser): Promise<void> {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      select: { owner_user_id: true, owner_trainer_id: true, archived_at: true },
    });

    if (!recipe || recipe.archived_at) {
      throw new AppException(RecipeError.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isDefault = recipe.owner_user_id === null && recipe.owner_trainer_id === null;
    if (isDefault) {
      if (user.role !== RoleEnum.ADMIN) {
        throw new AppException(RecipeError.NOT_EDITABLE, HttpStatus.FORBIDDEN);
      }
      return;
    }

    const isOwner =
      (user.role === RoleEnum.USER && recipe.owner_user_id === user.id) ||
      (user.role === RoleEnum.TRAINER && recipe.owner_trainer_id === user.id);

    if (!isOwner) throw new AppException(RecipeError.NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}
