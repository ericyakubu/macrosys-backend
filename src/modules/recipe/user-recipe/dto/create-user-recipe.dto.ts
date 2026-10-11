import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { CreateRecipeBase, RecipeTag, RecipeDietResDto, RecipeProductResDto } from '../../dto';
import { RecipeProductReqDto } from './user-recipe.dto';
import { MacrosResDto } from '@/shared/dto';

export class CreateUserRecipeReqDto extends CreateRecipeBase {
  @ApiProperty({
    type: [RecipeProductReqDto],
    description: 'List of products that will connected to the recipe',
  })
  @IsArray({ each: true })
  @IsNotEmpty()
  products: RecipeProductReqDto[];

  @ApiProperty({
    type: [RecipeTag],
    description: 'List of tags that will be created alongside the recipe',
  })
  @IsArray({ each: true })
  @IsOptional()
  tags: RecipeTag[];
}

export class CreateRecipeProductResDto {
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

export class CreateRecipeResDto extends MacrosResDto {
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
