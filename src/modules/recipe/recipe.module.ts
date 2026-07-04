import { Module } from '@nestjs/common';
import { UserRecipeController } from './controllers/user-recipe.controller';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  controllers: [RecipeController, UserRecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
