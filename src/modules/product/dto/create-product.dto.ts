import type { Product, UserProduct } from '@/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Decimal } from '@prisma/client/runtime/client';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductReqDto implements Partial<Product> {
  @ApiPropertyOptional({
    description: 'Product barcode',
    example: '4820001234567',
  })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  barcode?: string;

  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Greek Yogurt',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High-protein natural yogurt',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    description: 'Calories per 100g',
    example: 59.5,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  calories?: Decimal;

  @ApiPropertyOptional({
    description: 'Protein per 100g',
    example: 10.3,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  protein?: Decimal;

  @ApiPropertyOptional({
    description: 'Fat per 100g',
    example: 0.4,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fat?: Decimal;

  @ApiPropertyOptional({
    description: 'Carbohydrates per 100g',
    example: 3.6,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  carbohydrates?: Decimal;

  @ApiPropertyOptional({
    description: 'Sugar per 100g',
    example: 3.2,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  sugar?: Decimal;

  @ApiPropertyOptional({
    description: 'Fiber per 100g',
    example: 1.1,
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  fiber?: Decimal;
}

export class ProductDto implements Partial<Product> {
  @ApiProperty({ type: String, nullable: true, example: '4820001234567' })
  barcode?: string;

  @ApiProperty({ type: Number, nullable: true, example: 59.5 })
  calories?: Decimal;

  @ApiProperty({ type: String, nullable: true, example: 45 })
  carbohydrates?: Decimal;

  @ApiProperty({ type: String, nullable: true, example: 'High-protein natural yogurt' })
  description?: string;

  @ApiProperty({ type: Number, nullable: true, example: 0.4 })
  fat?: Decimal;

  @ApiProperty({ type: Number, nullable: true, example: 1.1 })
  fiber?: Decimal;

  @ApiProperty({ type: String, nullable: true, example: 'Greek Yogurt' })
  name?: string;

  @ApiProperty({ type: Number, nullable: true, example: 10.3 })
  protein?: Decimal;

  @ApiProperty({ type: Number, nullable: true, example: 3.2 })
  sugar?: Decimal;

  @ApiProperty({ type: String, nullable: true, example: '3065b452-0f5b-4da1-afcb-11a8a88c6942' })
  id?: string;

  @ApiProperty({ type: Number, nullable: true, example: 3.6 })
  rating?: Decimal;

  @ApiProperty({ type: Date, nullable: true, example: '2026-04-09T20:52:37.238Z' })
  created_at?: Date;
}

export class CreateUserProductReqDto implements Partial<UserProduct> {}
