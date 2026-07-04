import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import type { UserProduct } from '@/prisma/client';
import { OptionalString } from '@/shared/decorators';
import { MacrosReqDto, MacrosResDto } from '@/shared/dto';

export class ProductResDiet {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;
}

export class CreateProductReqDto extends MacrosReqDto {
  @OptionalString('Product barcode', '4820001234567', 64)
  barcode?: string;

  @OptionalString('Product name', 'Greek Yogurt', 255)
  name: string;

  @OptionalString('Product description', 'High-protein natural yogurt', 1000)
  description?: string;

  @ApiPropertyOptional({
    type: [String],
    nullable: true,
    example: ['482afda0001234567', '4820adsf001234567'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diets?: string[];
}

export class CreateProductResDto extends MacrosResDto {
  @ApiProperty({ type: String, nullable: true, example: '3065b452-0f5b-4da1-afcb-11a8a88c6942' })
  id?: string;

  @ApiProperty({ type: String, nullable: true, example: '4820001234567' })
  barcode?: string;

  @ApiProperty({ type: String, nullable: true, example: 'High-protein natural yogurt' })
  description?: string;

  @ApiProperty({ type: String, nullable: true, example: 'Greek Yogurt' })
  name?: string;

  @ApiProperty({ type: Number, nullable: true, example: 3.6 })
  rating?: number;

  @ApiProperty({ type: Date, nullable: true, example: '2026-04-09T20:52:37.238Z' })
  created_at?: Date;
}

export class UpdateProductReqDto extends CreateProductReqDto {}
export class UpdateProductResDto extends CreateProductResDto {}

export class ProductDto extends CreateProductResDto {
  @ApiProperty({
    type: String,
    nullable: true,
    example:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
  })
  photo?: string;

  @ApiProperty({
    type: [ProductResDiet],
    example: [
      {
        id: '482afda0001234567',
        name: 'Vegan',
      },
      {
        id: '4820adsf001234567',
        name: 'Keto',
      },
    ],
  })
  diets: ProductResDiet[];
}

export class CreateUserProductReqDto implements Partial<UserProduct> {}
