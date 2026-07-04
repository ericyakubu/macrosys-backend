export * from './cookies';

export const formatMacrosAndRating = (product) => {
  return {
    calories: +product.calories,
    carbohydrates: +product.carbohydrates,
    fat: +product.fat,
    fiber: +product.fiber,
    protein: +product.protein,
    rating: +product.rating,
    sugar: +product.sugar,
  };
};
