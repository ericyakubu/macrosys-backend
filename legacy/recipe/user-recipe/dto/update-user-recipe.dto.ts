import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { OptionalNumber, OptionalString } from '@/shared/decorators';
import { RecipeDietResDto } from '../../dto';
import { RecipeProductReqDto, RecipeProductResDto } from './user-recipe.dto';
import { MacrosResDto } from '@/shared/dto';

export class UpdateUserRecipeReqDto {
  @OptionalString({ description: 'Recipe name', example: 'Yogurt' })
  name?: string;

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

  @ApiProperty({
    type: [RecipeProductReqDto],
    description: 'List of products that will connected to the recipe',
    nullable: true,
  })
  @IsArray({ each: true })
  @IsOptional()
  products?: RecipeProductReqDto[];
}

export class UpdateUserRecipeResDto extends MacrosResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  instructions: string;

  @ApiProperty({ type: Number })
  cook_time: number;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  prep_time: number;

  @ApiProperty({ type: Number })
  servings: number;

  @ApiProperty({ type: [RecipeProductResDto] })
  products: RecipeProductResDto[];

  @ApiProperty({ type: [RecipeDietResDto] })
  diets: RecipeDietResDto[];
}
