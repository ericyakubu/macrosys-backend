/*
  Warnings:

  - You are about to alter the column `calories` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `carbohydrates` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fat` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `protein` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fiber` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `sugar` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `calories` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `carbohydrates` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fat` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fiber` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `protein` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `sugar` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `calories` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `carbohydrates` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fat` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `protein` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `fiber` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to alter the column `sugar` on the `UserProduct` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.
  - You are about to drop the column `total_calories` on the `UserRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_carbohydrates` on the `UserRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_fat` on the `UserRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_fiber` on the `UserRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_protein` on the `UserRecipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_sugar` on the `UserRecipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "calories" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "carbohydrates" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fat" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "protein" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fiber" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "sugar" SET DATA TYPE DECIMAL(6,2);

-- AlterTable
ALTER TABLE "Recipe" ALTER COLUMN "calories" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "carbohydrates" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fat" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fiber" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "protein" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "sugar" SET DATA TYPE DECIMAL(6,2);

-- AlterTable
ALTER TABLE "UserProduct" ALTER COLUMN "calories" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "carbohydrates" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fat" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "protein" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "fiber" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "sugar" SET DATA TYPE DECIMAL(6,2);

-- AlterTable
ALTER TABLE "UserRecipe" DROP COLUMN "total_calories",
DROP COLUMN "total_carbohydrates",
DROP COLUMN "total_fat",
DROP COLUMN "total_fiber",
DROP COLUMN "total_protein",
DROP COLUMN "total_sugar",
ADD COLUMN     "calories" DECIMAL(8,2),
ADD COLUMN     "carbohydrates" DECIMAL(6,2),
ADD COLUMN     "fat" DECIMAL(6,2),
ADD COLUMN     "fiber" DECIMAL(6,2),
ADD COLUMN     "protein" DECIMAL(6,2),
ADD COLUMN     "sugar" DECIMAL(6,2);
