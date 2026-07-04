import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Diet, DietSourceEnum } from '@/prisma/client';
import { OptionalNumber } from '@/shared/decorators';
import { SortOrderEnum } from '@/shared/types';

export enum DietsSortByEnum {
  NAME = 'name',
  CREATED_AT = 'created_at',
}

export class DietDto implements Partial<Diet> {
  @ApiProperty({ type: String, example: '4820001234567' })
  id: string;
  @ApiProperty({ type: Boolean, example: true })
  is_active: boolean;
  @ApiProperty({ type: Boolean, example: false })
  is_system: boolean;
  @ApiProperty({ type: String, example: 'Vegan' })
  name: string;
  @ApiProperty({ enum: DietSourceEnum, example: DietSourceEnum.STAFF })
  source?: DietSourceEnum;
  @ApiProperty({ type: String, nullable: true, example: 'super mega diet' })
  description?: string;
}

export class CreateDietReqDto implements Partial<Diet> {
  @ApiProperty({ type: String, required: true, example: 'Vegan' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, nullable: true, example: 'super mega diet' })
  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateDietReqDto extends PartialType(CreateDietReqDto) {
  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

export class GetAllDietsQueryDto {
  @ApiPropertyOptional({
    description: 'Only include active diets',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_active?: boolean;

  @OptionalNumber('limit results to this number of diets per page', 25)
  limit?: number;

  @OptionalNumber('offset results by this number of diets per page', 25)
  offset?: number;

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
}
export class AdminGetAllDietsQueryDto {
  @ApiPropertyOptional({
    description: 'Only include active diets',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  is_active?: boolean;

  @ApiPropertyOptional({
    description:
      'Select diets created by this source (STAFF, TRAINER, SYSTEM, MODERATOR). defaults to all',
    enum: DietSourceEnum,
    example: DietSourceEnum.STAFF,
  })
  @IsOptional()
  @IsEnum(DietSourceEnum)
  source?: DietSourceEnum;

  @OptionalNumber('limit results to this number of diets per page', 25)
  limit?: number;

  @OptionalNumber('offset results by this number of diets per page', 25)
  offset?: number;

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
}
