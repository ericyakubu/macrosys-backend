import type { Decimal } from '@prisma/client/runtime/index-browser';

export interface FoundProduct {
  id: string;
  owner_user_id: string;
  owner_trainer_id: string;
  calories: Decimal;
  protein: Decimal;
  fat: Decimal;
  carbohydrates: Decimal;
  fiber: Decimal;
  sugar: Decimal;
  archived_at: Date;
  diets: {
    id: string;
    name: string;
  }[];
}
