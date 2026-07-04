import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { OptionalNumber } from '@/shared/decorators';
import { MacrosFilterReqDto } from '@/shared/dto';
import { SortOrderEnum } from '@/shared/types';

export enum DietsSortByEnum {
  NAME = 'name',
  CREATED_AT = 'created_at',
  RATING = 'rating',
  CALORIES = 'calories',
  CARBOHYDRATES = 'carbohydrates',
  FAT = 'fat',
  PROTEIN = 'protein',
  FIBER = 'fiber',
  SUGAR = 'sugar',
}

export class GetAllProductsDto extends MacrosFilterReqDto {
  @OptionalNumber('rating less than', 25)
  rating_lte?: number;
  @OptionalNumber('rating higher than', 25)
  rating_gte?: number;

  @ApiPropertyOptional({
    description: 'Field used for sorting results. Defaults to created_at if not provided',
    enum: DietsSortByEnum,
    example: DietsSortByEnum.NAME,
  })
  @IsOptional()
  @IsEnum(DietsSortByEnum)
  sort_by?: DietsSortByEnum;

  @ApiPropertyOptional({
    description: 'Sort direction. Use asc for oldest/smallest first, desc for newest/largest first',
    enum: SortOrderEnum,
    example: SortOrderEnum.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;

  @ApiPropertyOptional({
    description: 'load product photo',
    example: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  photo?: number;
}
