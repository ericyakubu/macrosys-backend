import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  Min,
  IsArray,
  IsUUID,
  ValidateNested,
  Max,
  IsEnum,
} from 'class-validator';
import { SortOrderEnum } from '@/shared/types';
import { ProductDto } from './product.dto';
import { RangeDto } from '@/shared/dto';

// Req

export enum ProductSortBy {
  CALORIES = 'calories',
  PROTEIN = 'protein',
  FAT = 'fat',
  CARBOHYDRATES = 'carbohydrates',
  FIBER = 'fiber',
  SUGAR = 'sugar',
  CREATED_AT = 'created_at',
}

export class GetProductReqDto {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsArray()
  @IsUUID('all', { each: true })
  diets?: string[];

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

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 150 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(150)
  limit?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({ enum: ProductSortBy })
  @IsOptional()
  @IsEnum(ProductSortBy)
  sort_by?: ProductSortBy;

  @ApiPropertyOptional({ enum: SortOrderEnum })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;
}

// Res

export class GetProductsResDto {
  @ApiProperty({ type: [ProductDto] })
  products: ProductDto[];
  @ApiProperty({ type: Number })
  total: number;
}
