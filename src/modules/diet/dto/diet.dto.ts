import { Diet, DietSourceEnum } from '@/prisma/client';
import { SortOrderEnum } from '@/shared/types';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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

export class UpdateDietReqDto extends PartialType(CreateDietReqDto) {}

export enum DietsSortByEnum {
  NAME = 'name',
  CREATED_AT = 'created_at',
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

  @ApiPropertyOptional({
    description: 'limit results to this number of diets per page',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    description: 'offset results by this number of diets per page',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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

  @ApiPropertyOptional({
    description: 'offset results by this number of diets per page',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  created_by?: string;

  @ApiPropertyOptional({
    description: 'limit results to this number of diets per page',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @ApiPropertyOptional({
    description: 'offset results by this number of diets per page',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
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
