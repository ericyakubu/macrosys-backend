/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_owner_id_fkey";

-- DropIndex
DROP INDEX "Product_owner_id_idx";

-- DropIndex
DROP INDEX "Recipe_owner_id_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "owner_id",
ADD COLUMN     "owner_trainer_id" TEXT,
ADD COLUMN     "owner_user_id" TEXT;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "owner_id",
ADD COLUMN     "owner_trainer_id" TEXT,
ADD COLUMN     "owner_user_id" TEXT;

-- CreateIndex
CREATE INDEX "Product_owner_user_id_idx" ON "Product"("owner_user_id");

-- CreateIndex
CREATE INDEX "Product_owner_trainer_id_idx" ON "Product"("owner_trainer_id");

-- CreateIndex
CREATE INDEX "Recipe_owner_user_id_idx" ON "Recipe"("owner_user_id");

-- CreateIndex
CREATE INDEX "Recipe_owner_trainer_id_idx" ON "Recipe"("owner_trainer_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_trainer_id_fkey" FOREIGN KEY ("owner_trainer_id") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_trainer_id_fkey" FOREIGN KEY ("owner_trainer_id") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
