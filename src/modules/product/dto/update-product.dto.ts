import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import {
  IsString,
  MaxLength,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsArray,
  IsUUID,
} from 'class-validator';

export class UpdateProductReqDto {
  @ApiProperty({ type: String, maxLength: 200 })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  name: string;

  @ApiPropertyOptional({ type: String, maxLength: 64 })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  barcode?: string;

  @ApiPropertyOptional({ type: String, maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  // per 100 g
  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 1000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(1000)
  calories: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  protein: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  fat: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  carbohydrates: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  fiber?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  sugar?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  // one repeated field arrives as a string, two or more as an array
  @Transform(({ value }) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value],
  )
  @IsArray()
  @IsUUID('all', { each: true })
  diet_ids?: string[];
}
