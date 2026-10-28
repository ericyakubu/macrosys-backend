/*
  Warnings:

  - You are about to drop the column `created_at` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `is_system` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `recipe_id` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `source` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `trainer_id` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Trainer` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `TrainerSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `TrainerSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `TrainerSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `end` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `subscription_id` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the `RecipeProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainerCredentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainerPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserCredentials` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserDietPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGoal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGoalInitialMeasurements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMeasurements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMeasurementsPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProductPhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRecipePhoto` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRecipeProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRecipeTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DietToUserProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DietToUserRecipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserRecipeToUserRecipeTag` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Diet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `Trainer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[account_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `initiated_by` to the `ClientAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ClientAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Made the column `calories` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbohydrates` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `servings` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `carbohydrates` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fat` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fiber` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `protein` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sugar` on table `Recipe` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `account_id` to the `Trainer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ends_at` to the `TrainerSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `TrainerSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `TrainerSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `TrainerSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ends_at` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan_id` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `starts_at` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityLevelEnum" AS ENUM ('SEDENTARY', 'LIGHT', 'MODERATE', 'ACTIVE', 'VERY_ACTIVE');

-- CreateEnum
CREATE TYPE "MealTypeEnum" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- CreateEnum
CREATE TYPE "QuantityUnitEnum" AS ENUM ('GRAM', 'SERVING');

-- CreateEnum
CREATE TYPE "GoalMetricEnum" AS ENUM ('WEIGHT', 'BMI', 'BODY_FAT');

-- CreateEnum
CREATE TYPE "NutritionTargetSourceEnum" AS ENUM ('GOAL', 'TRAINER', 'MANUAL');

-- CreateEnum
CREATE TYPE "ShareScopeEnum" AS ENUM ('MEASUREMENTS', 'PROGRESS_PHOTOS', 'FOOD_LOG', 'WATER_LOG', 'GOALS');

-- CreateEnum
CREATE TYPE "InitiatorEnum" AS ENUM ('USER', 'TRAINER');

-- CreateEnum
CREATE TYPE "PlanAudienceEnum" AS ENUM ('USER', 'TRAINER');

-- CreateEnum
CREATE TYPE "SubscriptionStatusEnum" AS ENUM ('ACTIVE', 'CANCELED', 'EXPIRED');

-- DropForeignKey
ALTER TABLE "ClientAssignment" DROP CONSTRAINT "ClientAssignment_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "ClientAssignment" DROP CONSTRAINT "ClientAssignment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeProduct" DROP CONSTRAINT "RecipeProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "RecipeProduct" DROP CONSTRAINT "RecipeProduct_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainerCredentials" DROP CONSTRAINT "TrainerCredentials_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainerSubscription" DROP CONSTRAINT "TrainerSubscription_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "TrainerSubscription" DROP CONSTRAINT "TrainerSubscription_trainer_id_fkey";

-- DropForeignKey
ALTER TABLE "UserCredentials" DROP CONSTRAINT "UserCredentials_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserDietPlan" DROP CONSTRAINT "UserDietPlan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserGoal" DROP CONSTRAINT "UserGoal_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserGoalInitialMeasurements" DROP CONSTRAINT "UserGoalInitialMeasurements_goal_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMeasurements" DROP CONSTRAINT "UserMeasurements_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserMeasurementsPhoto" DROP CONSTRAINT "UserMeasurementsPhoto_measurement_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProduct" DROP CONSTRAINT "UserProduct_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProductPhoto" DROP CONSTRAINT "UserProductPhoto_user_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipe" DROP CONSTRAINT "UserRecipe_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipePhoto" DROP CONSTRAINT "UserRecipePhoto_user_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeProduct" DROP CONSTRAINT "UserRecipeProduct_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeProduct" DROP CONSTRAINT "UserRecipeProduct_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeProduct" DROP CONSTRAINT "UserRecipeProduct_user_product_id_fkey";

-- DropForeignKey
ALTER TABLE "UserRecipeTag" DROP CONSTRAINT "UserRecipeTag_user_id_fkey";

-- DropForeignKey
ALTER TABLE "UserSubscription" DROP CONSTRAINT "UserSubscription_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "_DietToUserProduct" DROP CONSTRAINT "_DietToUserProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_DietToUserProduct" DROP CONSTRAINT "_DietToUserProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_DietToUserRecipe" DROP CONSTRAINT "_DietToUserRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_DietToUserRecipe" DROP CONSTRAINT "_DietToUserRecipe_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserRecipeToUserRecipeTag" DROP CONSTRAINT "_UserRecipeToUserRecipeTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserRecipeToUserRecipeTag" DROP CONSTRAINT "_UserRecipeToUserRecipeTag_B_fkey";

-- DropIndex
DROP INDEX "ClientAssignment_trainer_id_idx";

-- DropIndex
DROP INDEX "Diet_source_idx";

-- DropIndex
DROP INDEX "Diet_trainer_id_name_key";

-- DropIndex
DROP INDEX "Trainer_email_key";

-- DropIndex
DROP INDEX "TrainerSubscription_trainer_id_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "UserSubscription_user_id_key";

-- AlterTable
ALTER TABLE "ClientAssignment" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "initiated_by" "InitiatorEnum" NOT NULL,
ADD COLUMN     "shared_scopes" "ShareScopeEnum"[] DEFAULT ARRAY[]::"ShareScopeEnum"[],
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "started_at" DROP NOT NULL,
ALTER COLUMN "started_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "created_at",
DROP COLUMN "created_by",
DROP COLUMN "is_active",
DROP COLUMN "is_system",
DROP COLUMN "recipe_id",
DROP COLUMN "source",
DROP COLUMN "trainer_id",
DROP COLUMN "updated_at",
ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "rating",
ADD COLUMN     "archived_at" TIMESTAMP(3),
ADD COLUMN     "owner_id" TEXT,
ADD COLUMN     "photo_url" TEXT,
ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "carbohydrates" SET NOT NULL,
ALTER COLUMN "fat" SET NOT NULL,
ALTER COLUMN "protein" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "archived_at" TIMESTAMP(3),
ADD COLUMN     "owner_id" TEXT,
ADD COLUMN     "photo_url" TEXT,
ALTER COLUMN "servings" SET NOT NULL,
ALTER COLUMN "servings" SET DEFAULT 1,
ALTER COLUMN "calories" SET NOT NULL,
ALTER COLUMN "calories" SET DEFAULT 0,
ALTER COLUMN "carbohydrates" SET NOT NULL,
ALTER COLUMN "carbohydrates" SET DEFAULT 0,
ALTER COLUMN "fat" SET NOT NULL,
ALTER COLUMN "fat" SET DEFAULT 0,
ALTER COLUMN "fiber" SET NOT NULL,
ALTER COLUMN "fiber" SET DEFAULT 0,
ALTER COLUMN "protein" SET NOT NULL,
ALTER COLUMN "protein" SET DEFAULT 0,
ALTER COLUMN "sugar" SET NOT NULL,
ALTER COLUMN "sugar" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Trainer" DROP COLUMN "email",
ADD COLUMN     "accepting_clients" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "is_listed" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "timezone" TEXT,
ALTER COLUMN "second_name" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "birthday" DROP NOT NULL,
ALTER COLUMN "birthday" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "TrainerSubscription" DROP COLUMN "end",
DROP COLUMN "start",
DROP COLUMN "subscription_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "ends_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "starts_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "SubscriptionStatusEnum" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "activity_level" "ActivityLevelEnum",
ADD COLUMN     "timezone" TEXT,
ALTER COLUMN "birthday" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "end",
DROP COLUMN "start",
DROP COLUMN "subscription_id",
ADD COLUMN     "ends_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "plan_id" TEXT NOT NULL,
ADD COLUMN     "starts_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "SubscriptionStatusEnum" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "RecipeProduct";

-- DropTable
DROP TABLE "TrainerCredentials";

-- DropTable
DROP TABLE "TrainerPlan";

-- DropTable
DROP TABLE "UserCredentials";

-- DropTable
DROP TABLE "UserDietPlan";

-- DropTable
DROP TABLE "UserGoal";

-- DropTable
DROP TABLE "UserGoalInitialMeasurements";

-- DropTable
DROP TABLE "UserMeasurements";

-- DropTable
DROP TABLE "UserMeasurementsPhoto";

-- DropTable
DROP TABLE "UserPlan";

-- DropTable
DROP TABLE "UserProduct";

-- DropTable
DROP TABLE "UserProductPhoto";

-- DropTable
DROP TABLE "UserRecipe";

-- DropTable
DROP TABLE "UserRecipePhoto";

-- DropTable
DROP TABLE "UserRecipeProduct";

-- DropTable
DROP TABLE "UserRecipeTag";

-- DropTable
DROP TABLE "_DietToUserProduct";

-- DropTable
DROP TABLE "_DietToUserRecipe";

-- DropTable
DROP TABLE "_UserRecipeToUserRecipeTag";

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "audience" "PlanAudienceEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "discount_price" DECIMAL(10,2),
    "sale_start" TIMESTAMP(3),
    "sale_end" TIMESTAMP(3),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "features" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeIngredient" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "grams" DECIMAL(8,2) NOT NULL,

    CONSTRAINT "RecipeIngredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FavoriteProduct" (
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteProduct_pkey" PRIMARY KEY ("user_id","product_id")
);

-- CreateTable
CREATE TABLE "FavoriteRecipe" (
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FavoriteRecipe_pkey" PRIMARY KEY ("user_id","recipe_id")
);

-- CreateTable
CREATE TABLE "FoodLogEntry" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "eaten_at" TIMESTAMP(3) NOT NULL,
    "meal_type" "MealTypeEnum" NOT NULL,
    "product_id" TEXT,
    "recipe_id" TEXT,
    "quantity" DECIMAL(8,2) NOT NULL,
    "unit" "QuantityUnitEnum" NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DECIMAL(8,2) NOT NULL,
    "protein" DECIMAL(6,2) NOT NULL,
    "fat" DECIMAL(6,2) NOT NULL,
    "carbohydrates" DECIMAL(6,2) NOT NULL,
    "fiber" DECIMAL(6,2),
    "sugar" DECIMAL(6,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaterLogEntry" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "amount_ml" INTEGER NOT NULL,
    "drunk_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaterLogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlan" (
    "id" TEXT NOT NULL,
    "trainer_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "target_calories" INTEGER,
    "target_protein" INTEGER,
    "target_fat" INTEGER,
    "target_carbs" INTEGER,
    "archived_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MealPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlanItem" (
    "id" TEXT NOT NULL,
    "meal_plan_id" TEXT NOT NULL,
    "day" INTEGER,
    "meal_type" "MealTypeEnum" NOT NULL,
    "product_id" TEXT,
    "recipe_id" TEXT,
    "quantity" DECIMAL(8,2) NOT NULL,
    "unit" "QuantityUnitEnum" NOT NULL,

    CONSTRAINT "MealPlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPlanAssignment" (
    "id" TEXT NOT NULL,
    "meal_plan_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealPlanAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "measured_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weight_kg" DOUBLE PRECISION,
    "height_cm" DOUBLE PRECISION,
    "body_fat" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeasurementPhoto" (
    "id" TEXT NOT NULL,
    "measurement_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeasurementPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "metric" "GoalMetricEnum" NOT NULL,
    "target_value" DOUBLE PRECISION NOT NULL,
    "target_date" DATE NOT NULL,
    "status" "GoalStatus" NOT NULL DEFAULT 'ACTIVE',
    "start_measurement_id" TEXT NOT NULL,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionTarget" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "calories" INTEGER NOT NULL,
    "protein_g" INTEGER NOT NULL,
    "fat_g" INTEGER NOT NULL,
    "carbs_g" INTEGER NOT NULL,
    "source" "NutritionTargetSourceEnum" NOT NULL,
    "goal_id" TEXT,
    "valid_from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_to" TIMESTAMP(3),

    CONSTRAINT "NutritionTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DietConflicts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietConflicts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DietToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DietToMealPlan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToMealPlan_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE INDEX "RecipeIngredient_product_id_idx" ON "RecipeIngredient"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeIngredient_recipe_id_product_id_key" ON "RecipeIngredient"("recipe_id", "product_id");

-- CreateIndex
CREATE INDEX "FavoriteProduct_product_id_idx" ON "FavoriteProduct"("product_id");

-- CreateIndex
CREATE INDEX "FavoriteRecipe_recipe_id_idx" ON "FavoriteRecipe"("recipe_id");

-- CreateIndex
CREATE INDEX "FoodLogEntry_user_id_eaten_at_idx" ON "FoodLogEntry"("user_id", "eaten_at");

-- CreateIndex
CREATE INDEX "WaterLogEntry_user_id_drunk_at_idx" ON "WaterLogEntry"("user_id", "drunk_at");

-- CreateIndex
CREATE INDEX "MealPlan_trainer_id_idx" ON "MealPlan"("trainer_id");

-- CreateIndex
CREATE INDEX "MealPlanItem_meal_plan_id_idx" ON "MealPlanItem"("meal_plan_id");

-- CreateIndex
CREATE INDEX "MealPlanAssignment_user_id_idx" ON "MealPlanAssignment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MealPlanAssignment_meal_plan_id_user_id_key" ON "MealPlanAssignment"("meal_plan_id", "user_id");

-- CreateIndex
CREATE INDEX "Measurement_user_id_measured_at_idx" ON "Measurement"("user_id", "measured_at");

-- CreateIndex
CREATE INDEX "MeasurementPhoto_measurement_id_idx" ON "MeasurementPhoto"("measurement_id");

-- CreateIndex
CREATE INDEX "Goal_user_id_status_idx" ON "Goal"("user_id", "status");

-- CreateIndex
CREATE INDEX "NutritionTarget_user_id_valid_to_idx" ON "NutritionTarget"("user_id", "valid_to");

-- CreateIndex
CREATE INDEX "_DietConflicts_B_index" ON "_DietConflicts"("B");

-- CreateIndex
CREATE INDEX "_DietToRecipe_B_index" ON "_DietToRecipe"("B");

-- CreateIndex
CREATE INDEX "_DietToMealPlan_B_index" ON "_DietToMealPlan"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_slug_key" ON "Diet"("slug");

-- CreateIndex
CREATE INDEX "Product_owner_id_idx" ON "Product"("owner_id");

-- CreateIndex
CREATE INDEX "Product_barcode_idx" ON "Product"("barcode");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Recipe_owner_id_idx" ON "Recipe"("owner_id");

-- CreateIndex
CREATE INDEX "Recipe_name_idx" ON "Recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_account_id_key" ON "Trainer"("account_id");

-- CreateIndex
CREATE INDEX "TrainerSubscription_trainer_id_status_idx" ON "TrainerSubscription"("trainer_id", "status");

-- CreateIndex
CREATE INDEX "TrainerSubscription_plan_id_idx" ON "TrainerSubscription"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_account_id_key" ON "User"("account_id");

-- CreateIndex
CREATE INDEX "UserSubscription_user_id_status_idx" ON "UserSubscription"("user_id", "status");

-- CreateIndex
CREATE INDEX "UserSubscription_plan_id_idx" ON "UserSubscription"("plan_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerSubscription" ADD CONSTRAINT "TrainerSubscription_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerSubscription" ADD CONSTRAINT "TrainerSubscription_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeIngredient" ADD CONSTRAINT "RecipeIngredient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProduct" ADD CONSTRAINT "FavoriteProduct_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteProduct" ADD CONSTRAINT "FavoriteProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteRecipe" ADD CONSTRAINT "FavoriteRecipe_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLogEntry" ADD CONSTRAINT "FoodLogEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLogEntry" ADD CONSTRAINT "FoodLogEntry_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLogEntry" ADD CONSTRAINT "FoodLogEntry_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WaterLogEntry" ADD CONSTRAINT "WaterLogEntry_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAssignment" ADD CONSTRAINT "ClientAssignment_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAssignment" ADD CONSTRAINT "ClientAssignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlan" ADD CONSTRAINT "MealPlan_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanItem" ADD CONSTRAINT "MealPlanItem_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanItem" ADD CONSTRAINT "MealPlanItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanItem" ADD CONSTRAINT "MealPlanItem_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanAssignment" ADD CONSTRAINT "MealPlanAssignment_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPlanAssignment" ADD CONSTRAINT "MealPlanAssignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeasurementPhoto" ADD CONSTRAINT "MeasurementPhoto_measurement_id_fkey" FOREIGN KEY ("measurement_id") REFERENCES "Measurement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_start_measurement_id_fkey" FOREIGN KEY ("start_measurement_id") REFERENCES "Measurement"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionTarget" ADD CONSTRAINT "NutritionTarget_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NutritionTarget" ADD CONSTRAINT "NutritionTarget_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "Goal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietConflicts" ADD CONSTRAINT "_DietConflicts_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietConflicts" ADD CONSTRAINT "_DietConflicts_B_fkey" FOREIGN KEY ("B") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToRecipe" ADD CONSTRAINT "_DietToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToRecipe" ADD CONSTRAINT "_DietToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToMealPlan" ADD CONSTRAINT "_DietToMealPlan_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToMealPlan" ADD CONSTRAINT "_DietToMealPlan_B_fkey" FOREIGN KEY ("B") REFERENCES "MealPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
