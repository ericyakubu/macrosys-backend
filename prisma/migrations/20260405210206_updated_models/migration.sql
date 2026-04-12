-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('USER', 'ADMIN', 'MODERATOR', 'TRAINER');

-- CreateEnum
CREATE TYPE "GenderEnum" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "DietEnum" AS ENUM ('vegan', 'vegetarian', 'mediterranean', 'ketogenic', 'intermittent_fasting', 'carnivore', 'volumetrics', 'slim_fast', 'dash', 'flexitarian', 'mind', 'atkins', 'paleo', 'omad');

-- CreateEnum
CREATE TYPE "LanguageEnum" AS ENUM ('EN', 'ZH', 'HI', 'ES', 'FR', 'AR', 'RU', 'PT', 'DE', 'JA', 'TR', 'KO', 'IT', 'NL', 'PL');

-- CreateEnum
CREATE TYPE "TrainerClientStatusEnum" AS ENUM ('PENDING', 'ACTIVE', 'PAUSED', 'ENDED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "DietSourceEnum" AS ENUM ('SYSTEM', 'TRAINER', 'STAFF');

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "second_name" TEXT,
    "lastname" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "language" "LanguageEnum" NOT NULL DEFAULT 'RU',
    "role" "RoleEnum" NOT NULL DEFAULT 'ADMIN',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "gender" "GenderEnum",

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminCredentials" (
    "id" TEXT NOT NULL,
    "admin_id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT,
    "description" TEXT,
    "rating" DECIMAL(65,30),
    "calories" DECIMAL(65,30),
    "carbohydrates" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "fiber" DECIMAL(65,30),
    "sugar" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPhoto" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cook_time" INTEGER,
    "description" TEXT,
    "instructions" TEXT,
    "prep_time" INTEGER,
    "servings" INTEGER,
    "total_calories" DECIMAL(65,30),
    "total_carbohydrates" DECIMAL(65,30),
    "total_fat" DECIMAL(65,30),
    "total_protein" DECIMAL(65,30),
    "total_fiber" DECIMAL(65,30),
    "total_sugar" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeProduct" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "second_name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "role" "RoleEnum" NOT NULL DEFAULT 'TRAINER',
    "gender" "GenderEnum",
    "language" "LanguageEnum" NOT NULL DEFAULT 'RU',
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAssignment" (
    "id" TEXT NOT NULL,
    "trainer_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "status" "TrainerClientStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_at" TIMESTAMP(3),

    CONSTRAINT "ClientAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerCredentials" (
    "id" TEXT NOT NULL,
    "trainer_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerSubscription" (
    "id" TEXT NOT NULL,
    "trainer_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "second_name" TEXT,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "birthday" TIMESTAMP(3),
    "role" "RoleEnum" NOT NULL DEFAULT 'USER',
    "gender" "GenderEnum",
    "language" "LanguageEnum" NOT NULL DEFAULT 'RU',
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabled_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCredentials" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "subscription_id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDietPlan" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "target_calories" INTEGER,
    "target_protein" INTEGER,
    "target_fat" INTEGER,
    "target_carbs" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDietPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMeasurements" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "weight_kg" DOUBLE PRECISION,
    "body_fat" DOUBLE PRECISION,
    "height_cm" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMeasurementsPhoto" (
    "id" TEXT NOT NULL,
    "measurement_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserMeasurementsPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoal" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "target_weight_kg" DOUBLE PRECISION,
    "target_bmi" DOUBLE PRECISION,
    "target_body_fat" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoalInitialMeasurements" (
    "id" TEXT NOT NULL,
    "weight_kg" DOUBLE PRECISION,
    "height_cm" DOUBLE PRECISION,
    "age" INTEGER,
    "body_fat" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "goal_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoalInitialMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProduct" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "barcode" TEXT,
    "description" TEXT,
    "rating" DECIMAL(65,30),
    "calories" DECIMAL(65,30),
    "carbohydrates" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "fiber" DECIMAL(65,30),
    "sugar" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "dietId" TEXT,

    CONSTRAINT "UserProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProductPhoto" (
    "id" TEXT NOT NULL,
    "user_product_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProductPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRecipe" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cook_time" INTEGER,
    "description" TEXT,
    "instructions" TEXT,
    "prep_time" INTEGER,
    "servings" INTEGER,
    "total_calories" DECIMAL(65,30),
    "total_carbohydrates" DECIMAL(65,30),
    "total_fat" DECIMAL(65,30),
    "total_protein" DECIMAL(65,30),
    "total_fiber" DECIMAL(65,30),
    "total_sugar" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRecipePhoto" (
    "id" TEXT NOT NULL,
    "user_recipe_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRecipeProduct" (
    "id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "user_product_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "source" "DietSourceEnum" NOT NULL DEFAULT 'SYSTEM',
    "trainer_id" TEXT,
    "created_by" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_system" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "recipeId" TEXT,

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "discount_price" DECIMAL(65,30),
    "discount_percent" DECIMAL(65,30),
    "sale_start" TIMESTAMP(3),
    "sale_end" TIMESTAMP(3),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainerPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "max_clients" INTEGER,
    "advanced_reports" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "discount_price" DECIMAL(65,30),
    "discount_percent" DECIMAL(65,30),
    "sale_start" TIMESTAMP(3),
    "sale_end" TIMESTAMP(3),
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainerPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DietToUserRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DietToUserRecipe_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminCredentials_admin_id_key" ON "AdminCredentials"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "AdminCredentials_login_key" ON "AdminCredentials"("login");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPhoto_product_id_key" ON "ProductPhoto"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_phone_key" ON "Trainer"("phone");

-- CreateIndex
CREATE INDEX "ClientAssignment_trainer_id_idx" ON "ClientAssignment"("trainer_id");

-- CreateIndex
CREATE INDEX "ClientAssignment_user_id_idx" ON "ClientAssignment"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAssignment_trainer_id_user_id_key" ON "ClientAssignment"("trainer_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerCredentials_trainer_id_key" ON "TrainerCredentials"("trainer_id");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerCredentials_email_key" ON "TrainerCredentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TrainerSubscription_trainer_id_key" ON "TrainerSubscription"("trainer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_user_id_key" ON "UserCredentials"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserCredentials_email_key" ON "UserCredentials"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_user_id_key" ON "UserSubscription"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserDietPlan_user_id_key" ON "UserDietPlan"("user_id");

-- CreateIndex
CREATE INDEX "UserMeasurements_user_id_created_at_idx" ON "UserMeasurements"("user_id", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "UserMeasurementsPhoto_measurement_id_key" ON "UserMeasurementsPhoto"("measurement_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoalInitialMeasurements_goal_id_key" ON "UserGoalInitialMeasurements"("goal_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProductPhoto_user_product_id_key" ON "UserProductPhoto"("user_product_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserRecipePhoto_user_recipe_id_key" ON "UserRecipePhoto"("user_recipe_id");

-- CreateIndex
CREATE INDEX "Diet_source_idx" ON "Diet"("source");

-- CreateIndex
CREATE UNIQUE INDEX "Diet_trainer_id_name_key" ON "Diet"("trainer_id", "name");

-- CreateIndex
CREATE INDEX "_DietToUserRecipe_B_index" ON "_DietToUserRecipe"("B");

-- AddForeignKey
ALTER TABLE "AdminCredentials" ADD CONSTRAINT "AdminCredentials_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPhoto" ADD CONSTRAINT "ProductPhoto_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeProduct" ADD CONSTRAINT "RecipeProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAssignment" ADD CONSTRAINT "ClientAssignment_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientAssignment" ADD CONSTRAINT "ClientAssignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerCredentials" ADD CONSTRAINT "TrainerCredentials_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerSubscription" ADD CONSTRAINT "TrainerSubscription_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainerSubscription" ADD CONSTRAINT "TrainerSubscription_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "TrainerPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCredentials" ADD CONSTRAINT "UserCredentials_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubscription" ADD CONSTRAINT "UserSubscription_subscription_id_fkey" FOREIGN KEY ("subscription_id") REFERENCES "UserPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDietPlan" ADD CONSTRAINT "UserDietPlan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMeasurements" ADD CONSTRAINT "UserMeasurements_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMeasurementsPhoto" ADD CONSTRAINT "UserMeasurementsPhoto_measurement_id_fkey" FOREIGN KEY ("measurement_id") REFERENCES "UserMeasurements"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoal" ADD CONSTRAINT "UserGoal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoalInitialMeasurements" ADD CONSTRAINT "UserGoalInitialMeasurements_goal_id_fkey" FOREIGN KEY ("goal_id") REFERENCES "UserGoal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProduct" ADD CONSTRAINT "UserProduct_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProductPhoto" ADD CONSTRAINT "UserProductPhoto_user_product_id_fkey" FOREIGN KEY ("user_product_id") REFERENCES "UserProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipe" ADD CONSTRAINT "UserRecipe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipePhoto" ADD CONSTRAINT "UserRecipePhoto_user_recipe_id_fkey" FOREIGN KEY ("user_recipe_id") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeProduct" ADD CONSTRAINT "UserRecipeProduct_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeProduct" ADD CONSTRAINT "UserRecipeProduct_user_product_id_fkey" FOREIGN KEY ("user_product_id") REFERENCES "UserProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRecipeProduct" ADD CONSTRAINT "UserRecipeProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "Trainer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToUserRecipe" ADD CONSTRAINT "_DietToUserRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Diet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DietToUserRecipe" ADD CONSTRAINT "_DietToUserRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
