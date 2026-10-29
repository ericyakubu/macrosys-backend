import { ShortDietDto } from '@/shared/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { Decimal } from '@prisma/client/runtime/client';

export class ProductDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  barcode: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  photo_url: string;

  @ApiProperty({ type: Number })
  calories: Decimal;

  @ApiProperty({ type: Number })
  protein: Decimal;

  @ApiProperty({ type: Number })
  fat: Decimal;

  @ApiProperty({ type: Number })
  carbohydrates: Decimal;

  @ApiProperty({ type: Number })
  fiber: Decimal;

  @ApiProperty({ type: Number })
  sugar: Decimal;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: [ShortDietDto] })
  diets: ShortDietDto[];

  @ApiPropertyOptional({ type: String, nullable: true })
  owner_user_id: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  owner_trainer_id: string | null;
}
