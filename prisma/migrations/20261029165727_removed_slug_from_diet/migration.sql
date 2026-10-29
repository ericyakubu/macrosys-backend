/*
  Warnings:

  - You are about to drop the column `slug` on the `Diet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Diet_slug_key";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "slug";

-- DropEnum
DROP TYPE "DietEnum";
