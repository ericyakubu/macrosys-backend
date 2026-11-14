// import { RangeDto } from '@/shared/dto';
import { RangeQueryMixin } from '@/shared/dto/range-query.mixin';
import { SortOrderEnum } from '@/shared/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
  // ValidateNested,
} from 'class-validator';
import { RecipeDto } from './recipe.dto';

export enum RecipeSortBy {
  PREP_TIME = 'prep_time',
  COOK_TIME = 'cook_time',
  SERVINGS = 'servings',
  CALORIES = 'calories',
  PROTEIN = 'protein',
  FAT = 'fat',
  CARBOHYDRATES = 'carbohydrates',
  FIBER = 'fiber',
  SUGAR = 'sugar',
  CREATED_AT = 'created_at',
}

export class GetRecipesReqDto extends RangeQueryMixin(
  'calories',
  'carbohydrates',
  'fat',
  'fiber',
  'protein',
  'sugar',

  'cook_time',
  'prep_time',
  'servings',
) {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  // один diets=... приходит строкой, два и больше массивом
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsUUID('all', { each: true })
  diets?: string[];

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(100)
  limit?: number;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({ enum: RecipeSortBy })
  @IsOptional()
  @IsEnum(RecipeSortBy)
  sort_by?: RecipeSortBy;

  @ApiPropertyOptional({ enum: SortOrderEnum, default: SortOrderEnum.ASC })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;
}

export class GetRecipesResDto {
  @ApiProperty({ type: [RecipeDto] })
  recipes: RecipeDto[];
  @ApiProperty({ type: Number })
  total: number;
}
