import { RangeDto } from '@/shared/dto';
import { SortOrderEnum } from '@/shared/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

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

export class GetRecipeReqDto {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  // один diets=... приходит строкой, два и больше массивом
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsUUID('all', { each: true })
  diets?: string[];

  @ApiPropertyOptional({ type: RangeDto, description: 'Prep time in minutes' })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  prep_time?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto, description: 'Cook time in minutes' })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  cook_time?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  servings?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  calories?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  protein?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  fat?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  carbohydrates?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  fiber?: RangeDto;

  @ApiPropertyOptional({ type: RangeDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => RangeDto)
  sugar?: RangeDto;

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
  sort_order?: SortOrderEnum = SortOrderEnum.ASC;
}
