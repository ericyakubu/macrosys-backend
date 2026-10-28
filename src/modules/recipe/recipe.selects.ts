import type { Prisma } from '@/prisma/client';
import type { RecipeDto } from './dto/recipe.dto';

export const RECIPE_SELECT = {
  id: true,
  name: true,
  description: true,
  instructions: true,
  photo_url: true,
  prep_time: true,
  cook_time: true,
  servings: true,
  calories: true,
  protein: true,
  fat: true,
  carbohydrates: true,
  fiber: true,
  sugar: true,
  created_at: true,
  owner_user_id: true,
  owner_trainer_id: true,
  diets: { select: { id: true, name: true } },
  ingredients: {
    select: {
      grams: true,
      product: { select: { id: true, name: true, photo_url: true } },
    },
  },
} satisfies Prisma.RecipeSelect;

type RecipeRow = Prisma.RecipeGetPayload<{ select: typeof RECIPE_SELECT }>;

export function toRecipeDto({
  calories,
  protein,
  fat,
  carbohydrates,
  fiber,
  sugar,
  ingredients,
  ...rest
}: RecipeRow): RecipeDto {
  return {
    ...rest,
    calories: calories.toNumber(),
    protein: protein.toNumber(),
    fat: fat.toNumber(),
    carbohydrates: carbohydrates.toNumber(),
    fiber: fiber.toNumber(),
    sugar: sugar.toNumber(),
    ingredients: ingredients.map(({ grams, product }) => ({
      id: product.id,
      name: product.name,
      photo_url: product.photo_url,
      grams: grams.toNumber(),
    })),
  };
}
