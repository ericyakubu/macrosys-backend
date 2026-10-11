-- CreateTable
CREATE TABLE "UserRecipeTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipeTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserRecipeToUserRecipeTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserRecipeToUserRecipeTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserRecipeToUserRecipeTag_B_index" ON "_UserRecipeToUserRecipeTag"("B");

-- AddForeignKey
ALTER TABLE "UserRecipeTag" ADD CONSTRAINT "UserRecipeTag_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRecipeToUserRecipeTag" ADD CONSTRAINT "_UserRecipeToUserRecipeTag_A_fkey" FOREIGN KEY ("A") REFERENCES "UserRecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserRecipeToUserRecipeTag" ADD CONSTRAINT "_UserRecipeToUserRecipeTag_B_fkey" FOREIGN KEY ("B") REFERENCES "UserRecipeTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
