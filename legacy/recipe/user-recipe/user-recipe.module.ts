import { Module } from '@nestjs/common';
import { UserRecipeController } from './user-recipe.controller';
import { UserRecipeService } from './user-recipe.service';
import { RecipeSharedService } from '../recipe-shared.service';
@Module({
  controllers: [UserRecipeController],
  providers: [UserRecipeService, RecipeSharedService],
})
export class UserRecipeModule {}
