import { Prisma } from '@/prisma/client';

const ZERO = new Prisma.Decimal(0);

export async function recalculateRecipe(tx: Prisma.TransactionClient, recipeId: string) {
  const ingredients = await tx.recipeIngredient.findMany({
    where: { recipe_id: recipeId },
    select: {
      grams: true,
      product: {
        select: {
          calories: true,
          protein: true,
          fat: true,
          carbohydrates: true,
          fiber: true,
          sugar: true,
        },
      },
    },
  });

  const total = {
    calories: ZERO,
    protein: ZERO,
    fat: ZERO,
    carbohydrates: ZERO,
    fiber: ZERO,
    sugar: ZERO,
  };

  for (const { grams, product } of ingredients) {
    const factor = grams.div(100); // product macros are per 100 g
    for (const key of Object.keys(total) as (keyof typeof total)[]) {
      total[key] = total[key].add(factor.mul(product[key] ?? ZERO));
    }
  }

  await tx.recipe.update({ where: { id: recipeId }, data: total });
}

export async function recalculateRecipesUsing(tx: Prisma.TransactionClient, productId: string) {
  const recipes = await tx.recipe.findMany({
    where: { ingredients: { some: { product_id: productId } } },
    select: { id: true },
  });
  for (const { id } of recipes) await recalculateRecipe(tx, id);
}
