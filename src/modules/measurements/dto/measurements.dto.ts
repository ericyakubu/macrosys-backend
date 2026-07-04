import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional } from 'class-validator';
import type { UserMeasurements } from '@/prisma/client';
import { SortOrderEnum } from '@/shared/types';

export class CreateUserMeasurementsReqDto implements Partial<UserMeasurements> {
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  body_fat?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  height_cm?: number;

  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  weight_kg?: number;

  @ApiProperty({ type: 'string', format: 'binary', nullable: true })
  @IsOptional()
  photo?: string;
}

export class CreateUserMeasurementsResDto implements Partial<UserMeasurements> {
  @ApiProperty({ type: Number, nullable: true })
  body_fat: number | null;

  @ApiProperty({ type: Number, nullable: true })
  height_cm: number | null;

  @ApiProperty({ type: Number, nullable: true })
  weight_kg: number | null;

  @ApiProperty({ type: String, nullable: true })
  id: string;

  @ApiProperty({ type: String, nullable: true })
  bmi: number | null;
}

export class UpdateUserMeasurementsReqDto {
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  body_fat?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  height_cm?: number;

  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  weight_kg?: number;
}
export class UpdateUserMeasurementsResDto extends CreateUserMeasurementsResDto {}

export class MeasurementDto implements Partial<UserMeasurements> {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number, nullable: true })
  weight_kg: number | null;

  @ApiProperty({ type: Number, nullable: true })
  body_fat: number | null;

  @ApiProperty({ type: Number, nullable: true })
  height_cm: number | null;

  @ApiProperty({ type: Number, nullable: true })
  bmi: number | null;

  @ApiProperty({ type: String, nullable: true })
  photo: string | null;

  @ApiProperty({ type: Date })
  created_at: Date;
}

export enum MeasurementSortByEnum {
  CREATED_AT = 'created_at',
  WEIGHT_KG = 'weight_kg',
  BODY_FAT = 'body_fat',
  HEIGHT_CM = 'height_cm',
  BMI = 'bmi',
}

export class GetAllMeasurementsQueryDto {
  @ApiPropertyOptional({
    description: 'Only include measurements that have an attached progress photo',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  has_photo?: boolean;

  @ApiPropertyOptional({
    description: 'Minimum weight in kilograms (inclusive)',
    example: 70,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_weight?: number;

  @ApiPropertyOptional({
    description: 'Maximum weight in kilograms (inclusive)',
    example: 90,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_weight?: number;

  @ApiPropertyOptional({
    description: 'Minimum body fat percentage (inclusive)',
    example: 12.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_body_fat?: number;

  @ApiPropertyOptional({
    description: 'Maximum body fat percentage (inclusive)',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_body_fat?: number;

  @ApiPropertyOptional({
    description: 'Minimum height in centimeters (inclusive)',
    example: 175,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_height?: number;

  @ApiPropertyOptional({
    description: 'Maximum height in centimeters (inclusive)',
    example: 190,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_height?: number;

  @ApiPropertyOptional({
    description: 'Minimum BMI value (inclusive)',
    example: 21.5,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_bmi?: number;

  @ApiPropertyOptional({
    description: 'Maximum BMI value (inclusive)',
    example: 25,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_bmi?: number;

  @ApiPropertyOptional({
    description: 'Only include measurements created on or after this date (ISO 8601)',
    example: '2026-01-01T00:00:00.000Z',
  })
  @IsOptional()
  @IsDateString()
  from_date?: string;

  @ApiPropertyOptional({
    description: 'Only include measurements created on or before this date (ISO 8601)',
    example: '2026-04-12T23:59:59.999Z',
  })
  @IsOptional()
  @IsDateString()
  to_date?: string;

  @ApiPropertyOptional({
    description: 'Field used for sorting results. Defaults to created_at if not provided',
    enum: MeasurementSortByEnum,
    example: MeasurementSortByEnum.WEIGHT_KG,
  })
  @IsOptional()
  @IsEnum(MeasurementSortByEnum)
  sort_by?: MeasurementSortByEnum;

  @ApiPropertyOptional({
    description: 'Sort direction. Use asc for oldest/smallest first, desc for newest/largest first',
    enum: SortOrderEnum,
    example: SortOrderEnum.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;
}
