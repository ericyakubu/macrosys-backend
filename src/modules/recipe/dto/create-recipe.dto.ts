import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class RecipeProductDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: string;

  @ApiProperty({ type: Number, minimum: 0, maximum: 1000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  grams: number;
}

export class CreateRecipeReqDto {
  @ApiProperty({ type: String, maxLength: 200 })
  @IsString()
  @MaxLength(200)
  name: string;

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

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    maximum: 1000,
    description: 'Prep time in minutes',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1000)
  prep_time?: number;

  @ApiPropertyOptional({
    type: Number,
    minimum: 0,
    maximum: 1000,
    description: 'Cook time in minutes',
  })
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

  @ApiProperty({ type: [RecipeProductDto] })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayUnique((p: RecipeProductDto) => p.id)
  @ValidateNested({ each: true })
  @Type(() => RecipeProductDto)
  products: RecipeProductDto[];

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  diet_ids?: string[];
}
