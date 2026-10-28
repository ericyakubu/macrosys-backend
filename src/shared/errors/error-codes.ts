import type { AuthError } from '@/modules/auth/auth.errors';
import type { CommonError } from './common.errors';
import type { GoalError } from '@/modules/goals/goals.errors';
import type { ProductError } from '@/modules/product/product.errors';
import type { RecipeError } from '@/modules/recipe/recipe.errors';
import type { DietError } from '@/modules/diet/diet.errors';

type ValueOf<T> = T[keyof T];

export type ErrorCode =
  | ValueOf<typeof AuthError>
  | ValueOf<typeof CommonError>
  | ValueOf<typeof DietError>
  | ValueOf<typeof GoalError>
  | ValueOf<typeof ProductError>
  | ValueOf<typeof RecipeError>;
