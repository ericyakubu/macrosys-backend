import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { DietResolverService } from '../diet/diet-resolver.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, DietResolverService],
})
export class RecipeModule {}
