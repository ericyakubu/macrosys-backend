import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsArray,
  ArrayMinSize,
  ArrayUnique,
  ValidateNested,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { RecipeProductDto } from './create-recipe.dto';

export class UpdateRecipeReqDto {
  @ApiPropertyOptional({ type: String, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name?: string;

  @ApiPropertyOptional({ type: String, maxLength: 2500 })
  @IsOptional()
  @IsString()
  @MaxLength(2500)
  description?: string;

  @ApiPropertyOptional({ type: String, maxLength: 20000 })
  @IsOptional()
  @IsString()
  @MaxLength(20000)
  instructions?: string;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  prep_time?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  cook_time?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  servings?: number;

  @ApiPropertyOptional({ type: [RecipeProductDto], minItems: 2 })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(2)
  @ArrayUnique((p: RecipeProductDto) => p.id)
  @ValidateNested({ each: true })
  @Type(() => RecipeProductDto)
  products?: RecipeProductDto[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  diet_ids?: string[];
}
