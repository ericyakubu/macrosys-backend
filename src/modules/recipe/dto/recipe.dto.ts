import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { OptionalNumber, OptionalString } from '@/shared/decorators';
import { MacrosReqDto, MacrosResDto } from '@/shared/dto';

export class CreateRecipeBase extends MacrosReqDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @OptionalNumber('Prep time in minutes', 25)
  cook_time?: number;

  @OptionalString('Recipe description', 'High-protein natural yogurt')
  description?: string;

  @OptionalString('Step by step instructions')
  instructions?: string;

  @OptionalNumber('Prep time in minutes', 25)
  prep_time?: number;

  @OptionalNumber('Servings', 25)
  servings?: number;
}

export class RecipeProductReqDto {
  @IsUUID()
  @IsOptional()
  product_id: string;

  @IsNumber()
  quantity: number;
}

export class CreateRecipeReqDto extends CreateRecipeBase {
  @IsArray({ each: true })
  products: RecipeProductReqDto[];
}

export class CreateRecipeProductResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true, description: 'Image url' })
  url: string;

  @ApiProperty({ type: Number })
  quantity: number;
}

export class CreateRecipeDietResDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
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

  @ApiProperty({ type: [CreateRecipeProductResDto] })
  products: CreateRecipeProductResDto[];

  @ApiProperty({ type: [CreateRecipeDietResDto] })
  diets: CreateRecipeDietResDto[];
}
