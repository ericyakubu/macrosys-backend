/*
  Warnings:

  - You are about to drop the column `total_calories` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_carbohydrates` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_fat` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_fiber` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_protein` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `total_sugar` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "total_calories",
DROP COLUMN "total_carbohydrates",
DROP COLUMN "total_fat",
DROP COLUMN "total_fiber",
DROP COLUMN "total_protein",
DROP COLUMN "total_sugar",
ADD COLUMN     "calories" DECIMAL(65,30),
ADD COLUMN     "carbohydrates" DECIMAL(65,30),
ADD COLUMN     "fat" DECIMAL(65,30),
ADD COLUMN     "fiber" DECIMAL(65,30),
ADD COLUMN     "protein" DECIMAL(65,30),
ADD COLUMN     "sugar" DECIMAL(65,30);
