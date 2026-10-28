import type { Prisma } from '@/prisma/client';

export const PRODUCT_SELECT = {
  barcode: true,
  calories: true,
  carbohydrates: true,
  created_at: true,
  description: true,
  fat: true,
  fiber: true,
  id: true,
  name: true,
  protein: true,
  photo_url: true,
  sugar: true,
} satisfies Prisma.ProductSelect;
