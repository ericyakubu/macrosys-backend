/*
  Warnings:

  - Added the required column `updated_at` to the `Diet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diet" ADD COLUMN     "archived_at" TIMESTAMP(3),
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
