import type { Macros } from '@/shared/types';
import type { CreateRecipeBase } from '../dto';
import type { RecipeProductReqDto } from '../user-recipe/dto/user-recipe.dto';
import type { UpdateUserRecipeReqDto } from '../user-recipe/dto/update-user-recipe.dto';
import type { CreateUserRecipeReqDto } from '../user-recipe/dto/create-user-recipe.dto';

export const exportBase = (data: CreateRecipeBase | UpdateUserRecipeReqDto) => ({
  name: data.name,
  servings: data.servings,
  description: data.description,
  cook_time: data.cook_time,
  instructions: data.instructions,
  prep_time: data.prep_time,
});

export const sanitizeMacros = (m: Macros): Macros =>
  Object.fromEntries(Object.entries(m).map(([k, v]) => [k, Number.isFinite(v) ? +v : 0])) as Macros;

export const exportProducts = (
  key: 'user_product_id' | 'product_id',
  recipe: CreateUserRecipeReqDto | UpdateUserRecipeReqDto,
): RecipeProductReqDto[] => {
  return recipe.products.filter((product) => !!product[key]);
};
