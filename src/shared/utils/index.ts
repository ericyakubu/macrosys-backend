import type { Decimal } from '@prisma/client/runtime/client';

export * from './cookies';

interface ProductToFormat {
  rating?: number | Decimal;
  calories?: number | Decimal;
  carbohydrates?: number | Decimal;
  fat?: number | Decimal;
  fiber?: number | Decimal;
  protein?: number | Decimal;
  sugar?: number | Decimal;
}

export class Formatters {
  static macrosAndRating = (product: ProductToFormat) => ({
    calories: +product.calories,
    carbohydrates: +product.carbohydrates,
    fat: +product.fat,
    fiber: +product.fiber,
    protein: +product.protein,
    rating: +product.rating,
    sugar: +product.sugar,
  });
}
