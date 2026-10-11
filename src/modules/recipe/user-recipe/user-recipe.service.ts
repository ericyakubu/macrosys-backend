import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import type { Macros, UserFromRequest } from '@/shared/types';
// import type { CreateRecipeResDto, RecipeProductReqDto } from '../dto';
import type {
  GetAllRecipesQueryDto,
  GetRecipeQueryDto,
  GetRecipeQueryResDto,
  RecipeProductReqDto,
} from './dto/user-recipe.dto';
import { RecipeSharedService } from '../recipe-shared.service';
import { exportBase, exportProducts, sanitizeMacros } from '../utils';
import type { UpdateUserRecipeReqDto, UpdateUserRecipeResDto } from './dto/update-user-recipe.dto';
import type { CreateRecipeResDto, CreateUserRecipeReqDto } from './dto/create-user-recipe.dto';
import type { UserRecipeInclude } from '@/prisma/models';

@Injectable()
export class UserRecipeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly recipeSharedService: RecipeSharedService,
  ) {}

  async createUserRecipe(
    body: CreateUserRecipeReqDto,
    user: UserFromRequest,
  ): Promise<CreateRecipeResDto> {
    const recipeData = await this.prepareRecipeData(body);

    const recipe = await this.prismaService.userRecipe.create({
      data: {
        ...recipeData,

        user: {
          connect: {
            id: user.id,
          },
        },

        products: {
          create: this.createProductRelations(body),
        },

        diets: {
          connect: recipeData.diets.map((id) => ({ id })),
        },
      },

      include: this.recipeInclude,
    });

    return this.mapRecipe(recipe);
  }

  async updateUserRecipe(
    body: UpdateUserRecipeReqDto,
    user: UserFromRequest,
    id: string,
  ): Promise<UpdateUserRecipeResDto> {
    const recipeData = await this.prepareRecipeData(body);

    const recipe = await this.prismaService.userRecipe.update({
      where: {
        id,
        user_id: user.id,
      },

      data: {
        ...recipeData,

        products: {
          deleteMany: {},

          create: this.createProductRelations(body),
        },

        diets: {
          set: recipeData.diets.map((id) => ({ id })),
        },
      },

      include: this.recipeInclude,
    });

    return this.mapRecipe(recipe);
  }

  async getUserRecipe(
    id: string,
    user: UserFromRequest,
    queries: GetRecipeQueryDto,
  ): Promise<GetRecipeQueryResDto> {
    const { diets, products } = queries;

    const toInclude: UserRecipeInclude = {
      ...(diets !== false && {
        diets: this.recipeInclude.diets,
      }),

      ...(products !== false && {
        products: this.recipeInclude.products,
      }),
    };

    const recipe = await this.prismaService.userRecipe.findFirstOrThrow({
      where: { id, user_id: user.id },
      include: toInclude,
    });

    return this.mapRecipe(recipe);
  }

  async getAllUserRecipes(
    user: UserFromRequest,
    queries: GetAllRecipesQueryDto,
  ): Promise<GetRecipeQueryResDto[]> {
    const { limit, offset, sort_by, sort_order, diets, products } = queries;

    const toInclude: UserRecipeInclude = {
      ...(diets !== false && {
        diets: this.recipeInclude.diets,
      }),

      ...(products !== false && {
        products: this.recipeInclude.products,
      }),
    };

    const recipes = await this.prismaService.userRecipe.findMany({
      where: { user_id: user.id },
      orderBy: { [sort_by]: sort_order },
      take: limit,
      skip: offset,
      include: toInclude,
    });

    return recipes.map((recipe) => this.mapRecipe(recipe));
  }

  async deleteUserRecipe(id: string, user: UserFromRequest) {
    return await this.prismaService.userRecipe.deleteMany({
      where: { id, user_id: user.id },
    });
  }

  private async prepareRecipeData(body: CreateUserRecipeReqDto | UpdateUserRecipeReqDto) {
    const { macros, diets } = await this.calculateRecipeMacros(body);

    return {
      ...exportBase(body),
      ...macros,
      diets,
    };
  }

  private async calculateRecipeMacros(
    body: CreateUserRecipeReqDto | UpdateUserRecipeReqDto,
  ): Promise<{
    macros: Macros;
    diets: string[];
  }> {
    const userProducts = exportProducts('user_product_id', body) as RecipeProductReqDto[];

    const products = exportProducts('product_id', body) as RecipeProductReqDto[];

    const [
      { macros: userMacros, diets: userDiets },
      { macros: productMacros, diets: productDiets },
    ] = await Promise.all([
      this.recipeSharedService.exportMacros('userProduct', userProducts),

      this.recipeSharedService.exportMacros('product', products),
    ]);

    return {
      macros: sanitizeMacros({
        calories: userMacros.calories + productMacros.calories,

        carbohydrates: userMacros.carbohydrates + productMacros.carbohydrates,

        fat: userMacros.fat + productMacros.fat,

        fiber: userMacros.fiber + productMacros.fiber,

        protein: userMacros.protein + productMacros.protein,

        sugar: userMacros.sugar + productMacros.sugar,
      }),

      diets: [...new Set([...userDiets, ...productDiets])],
    };
  }

  private createProductRelations(body: CreateUserRecipeReqDto | UpdateUserRecipeReqDto) {
    const userProducts = exportProducts('user_product_id', body) as RecipeProductReqDto[];

    const products = exportProducts('product_id', body) as RecipeProductReqDto[];

    return [
      ...userProducts.map((product) => ({
        quantity: product.quantity,

        user_product: {
          connect: {
            id: product.user_product_id,
          },
        },
      })),

      ...products.map((product) => ({
        quantity: product.quantity,

        product: {
          connect: {
            id: product.product_id,
          },
        },
      })),
    ];
  }

  private readonly recipeInclude = {
    products: {
      select: {
        quantity: true,

        product: {
          select: {
            id: true,
            name: true,

            photo: {
              select: {
                url: true,
              },
            },

            diets: {
              select: {
                name: true,
              },
            },
          },
        },

        user_product: {
          select: {
            id: true,
            name: true,

            photo: {
              select: {
                url: true,
              },
            },

            diets: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    },

    diets: {
      select: {
        id: true,
        name: true,
      },
    },
  };

  private mapRecipe(recipe: any): CreateRecipeResDto {
    return {
      id: recipe.id,

      calories: +recipe.calories,
      carbohydrates: +recipe.carbohydrates,
      fiber: +recipe.fiber,
      fat: +recipe.fat,
      protein: +recipe.protein,
      sugar: +recipe.sugar,

      instructions: recipe.instructions,
      cook_time: recipe.cook_time,
      created_at: recipe.created_at,
      description: recipe.description,
      name: recipe.name,
      prep_time: recipe.prep_time,
      servings: recipe.servings,

      ...(recipe.products && {
        products: recipe.products
          .map((item) => {
            const product = item.product ?? item.user_product;

            if (!product) {
              return null;
            }

            return {
              id: product.id,
              name: product.name,
              url: product.photo?.url ?? null,
              quantity: item.quantity,
              diets: product.diets.map((diet) => diet.name),
            };
          })
          .filter(Boolean),
      }),

      ...(recipe.diets && {
        diets: recipe.diets.map((diet) => ({
          id: diet.id,
          name: diet.name,
        })),
      }),
    };
  }
}
