import { SortOrderEnum } from '@/shared/types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, Max, IsEnum } from 'class-validator';
import { DietDto } from './diet.dto';

export enum DietSortBy {
  NAME = 'name',
  CREATED_AT = 'created_at',
}

export class GetDietsReqDto {
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

  @ApiPropertyOptional({ enum: DietSortBy })
  @IsOptional()
  @IsEnum(DietSortBy)
  sort_by?: DietSortBy;

  @ApiPropertyOptional({ enum: SortOrderEnum })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;
}

export class GetDietsResDto {
  @ApiProperty({ type: [DietDto] })
  diets: DietDto[];
  @ApiProperty({ type: Number })
  total: number;
}
