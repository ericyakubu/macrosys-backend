/*
  Warnings:

  - You are about to drop the column `recipeId` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `dietId` on the `UserProduct` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_dietId_fkey";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "recipeId",
ADD COLUMN     "recipe_id" TEXT;

-- AlterTable
ALTER TABLE "UserProduct" DROP COLUMN "dietId";

-- CreateTable
CREATE TABLE "_DietToUserProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToUserProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DietToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DietToUserProduct_B_index" ON "_DietToUserProduct"("B");

-- CreateIndex
CREATE INDEX "_DietToProduct_B_index" ON "_DietToProduct"("B");

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToUserProduct" ADD CONSTRAINT "_DietToUserProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToUserProduct" ADD CONSTRAINT "_DietToUserProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToProduct" ADD CONSTRAINT "_DietToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToProduct" ADD CONSTRAINT "_DietToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
