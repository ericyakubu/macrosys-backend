// modules/diet/diet.errors.ts
export const DietError = {
  NOT_FOUND: 'DIET_NOT_FOUND',
  CONFLICTING_DIETS_DONT_EXIST: 'DIET_CONFLICTING_DIETS_DONT_EXIST',
  SELF_CONFLICT: 'DIET_SELF_CONFLICT',
} as const;
