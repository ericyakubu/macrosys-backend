import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { OptionalNumber, OptionalString, RequiredString } from '@/shared/decorators';
import type { UserRecipeTag } from '@/prisma/client';

export class CreateRecipeBase {
  @ApiProperty({ type: String, required: true, example: 'Carbonara' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @OptionalNumber({ description: 'Prep time in minutes', example: 25 })
  cook_time?: number;

  @OptionalString({ description: 'Recipe description', example: 'High-protein natural yogurt' })
  description?: string;

  @OptionalString({ description: 'Step by step instructions' })
  instructions?: string;

  @OptionalNumber({ description: 'Prep time in minutes', example: 25 })
  prep_time?: number;

  @OptionalNumber({ description: 'Servings', example: 25 })
  servings?: number;
}

export class RecipeProductResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true, description: 'Image url' })
  url: string;

  @ApiProperty({ type: Number, description: 'Product quantity in grams' })
  quantity: number;

  @ApiProperty({ type: [String] })
  diets: string[];
}

export class RecipeDietResDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
}

export class RecipeTag implements Partial<UserRecipeTag> {
  @RequiredString({ example: 'Carbonara' })
  name: string;

  @OptionalString({ description: 'Recipe description', example: 'High-protein natural yogurt' })
  description?: string;
}
