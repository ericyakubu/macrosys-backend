import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import type { Macros, UserFromRequest } from '@/shared/types';
import type {
  CreateRecipeBase,
  CreateUserRecipeReqDto,
  UserRecipeProductReqDto,
  CreateRecipeReqDto,
  RecipeProductReqDto,
  CreateRecipeResDto,
} from './dto';

@Injectable()
export class RecipeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUserRecipe(
    body: CreateUserRecipeReqDto,
    user: UserFromRequest,
  ): Promise<CreateRecipeResDto> {
    const base = this.exportBase(body);
    const userProducts = this.exportProducts('user_product_id', body) as UserRecipeProductReqDto[];
    const products = this.exportProducts('product_id', body) as RecipeProductReqDto[];

    const userProductMacros = await this.exportMacros('userProduct', userProducts);
    const productMacros = await this.exportMacros('product', products);

    const totalMacros: Macros = {
      calories: body.calories ?? userProductMacros.macros.calories + productMacros.macros.calories,
      carbohydrates:
        body.carbohydrates ??
        userProductMacros.macros.carbohydrates + productMacros.macros.carbohydrates,
      fat: body.fat ?? userProductMacros.macros.fat + productMacros.macros.fat,
      fiber: body.fiber ?? userProductMacros.macros.fiber + productMacros.macros.fiber,
      protein: body.protein ?? userProductMacros.macros.protein + productMacros.macros.protein,
      sugar: body.sugar ?? userProductMacros.macros.sugar + productMacros.macros.sugar,
    };

    const diets = [...userProductMacros.diets, ...productMacros.diets].flat();

    const recipe = await this.prismaService.userRecipe.create({
      data: {
        ...base,
        user: {
          connect: {
            id: user.id,
          },
        },
        ...totalMacros,
        products: {
          create: [
            ...userProducts.map((p) => ({
              quantity: p.quantity,
              user_product: {
                connect: { id: p.user_product_id },
              },
            })),
            ...products.map((p) => ({
              quantity: p.quantity,
              product: {
                connect: { id: p.product_id },
              },
            })),
          ],
        },
        diets: {
          connect: diets.map((d) => ({ id: d })),
        },
      },
      select: this.recipeSelect,
    });

    return this.mapRecipe(recipe);
  }

  async createRecipe(body: CreateRecipeReqDto): Promise<CreateRecipeResDto> {
    const base = this.exportBase(body);
    const productsIds = this.exportProducts('product_id', body);
    const productMacros = await this.exportMacros('product', productsIds);
    const diets = [...productMacros.diets].flat();

    const totalMacros: Macros = {
      calories: body.calories ?? productMacros.macros.calories,
      carbohydrates: body.carbohydrates ?? productMacros.macros.carbohydrates,
      fat: body.fat ?? productMacros.macros.fat,
      fiber: body.fiber ?? productMacros.macros.fiber,
      protein: body.protein ?? productMacros.macros.protein,
      sugar: body.sugar ?? productMacros.macros.sugar,
    };

    const recipe = await this.prismaService.recipe.create({
      data: {
        ...base,
        ...totalMacros,
        products: {
          create: [
            ...productsIds.map((p) => ({
              quantity: p.quantity,
              product: {
                connect: { id: p.product_id },
              },
            })),
          ],
        },
        diets: {
          connect: diets.map((d) => ({ id: d })),
        },
      },
      select: this.recipeSelect,
    });

    return this.mapRecipe(recipe);
  }

  private exportBase(data: CreateRecipeBase) {
    return {
      name: data.name,
      servings: data.servings,
      description: data.description,
      cook_time: data.cook_time,
      instructions: data.instructions,
      prep_time: data.prep_time,
    };
  }

  private exportProducts(
    key: 'user_product_id' | 'product_id',
    recipe: CreateUserRecipeReqDto | CreateRecipeReqDto,
  ): UserRecipeProductReqDto[] | RecipeProductReqDto[] {
    return recipe.products.filter((product) => !!product[key]);
  }

  private async exportMacros(
    type: 'userProduct' | 'product',
    items: UserRecipeProductReqDto[] | RecipeProductReqDto[],
  ) {
    const macros: Macros = {
      calories: 0,
      carbohydrates: 0,
      fat: 0,
      fiber: 0,
      protein: 0,
      sugar: 0,
    };

    const idKey = type === 'userProduct' ? 'user_product_id' : 'product_id';

    const ids = items.map((i) => i[idKey]);

    const fetched =
      type === 'userProduct'
        ? await this.prismaService.userProduct.findMany({
            where: { id: { in: ids } },
            include: { diets: true },
          })
        : await this.prismaService.product.findMany({
            where: { id: { in: ids } },
            include: { diets: true },
          });

    const productMap = new Map(fetched.map((p) => [p.id, p]));
    const diets = fetched.map((p) => p.diets.map((d) => d.id)).flat();

    for (const item of items) {
      const product = productMap.get(item[idKey]);
      if (!product) continue;

      const ratio = (item.quantity ?? 0) / 100;

      macros.calories += (product.calories?.toNumber() ?? 0) * ratio;
      macros.carbohydrates += (product.carbohydrates?.toNumber() ?? 0) * ratio;
      macros.fat += (product.fat?.toNumber() ?? 0) * ratio;
      macros.fiber += (product.fiber?.toNumber() ?? 0) * ratio;
      macros.protein += (product.protein?.toNumber() ?? 0) * ratio;
      macros.sugar += (product.sugar?.toNumber() ?? 0) * ratio;
    }

    return { macros, diets };
  }

  private mapRecipe(recipe: any): CreateRecipeResDto {
    return {
      id: recipe.id,
      instructions: recipe.instructions,
      calories: recipe.calories,
      carbohydrates: recipe.carbohydrates,
      cook_time: recipe.cook_time,
      created_at: recipe.created_at,
      description: recipe.description,
      fat: recipe.fat,
      fiber: recipe.fiber,
      name: recipe.name,
      prep_time: recipe.prep_time,
      protein: recipe.protein,
      servings: recipe.servings,
      sugar: recipe.sugar,

      products: recipe.products.map((p) => ({
        id: p.product.id,
        name: p.product.name,
        url: p.product.photo?.url ?? null,
        quantity: p.quantity,
      })),

      diets: recipe.diets.map((d) => ({
        id: d.id,
        name: d.name,
      })),
    };
  }

  private readonly recipeSelect = {
    id: true,
    instructions: true,
    calories: true,
    carbohydrates: true,
    cook_time: true,
    created_at: true,
    description: true,
    fat: true,
    fiber: true,
    name: true,
    prep_time: true,
    protein: true,
    servings: true,
    sugar: true,
    products: {
      select: {
        product: {
          select: {
            name: true,
            id: true,
            photo: {
              select: {
                url: true,
              },
            },
          },
        },
        quantity: true,
      },
    },
    diets: {
      where: { is_active: true },
      select: {
        id: true,
        name: true,
      },
    },
  };
}
