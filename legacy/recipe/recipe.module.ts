import { Module } from '@nestjs/common';
// import { RecipeService } from './recipe.service';
// import { SystemRecipeModule } from './system-recipe/system-recipe.module';
// import { TrainerRecipeModule } from './trainer-recipe/trainer-recipe.module';
import { UserRecipeModule } from './user-recipe/user-recipe.module';

@Module({
  imports: [
    UserRecipeModule,
    // TrainerRecipeModule, SystemRecipeModule
  ],
  // providers: [RecipeService],
})
export class RecipeModule {}
