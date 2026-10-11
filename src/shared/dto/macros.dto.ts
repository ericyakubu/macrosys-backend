import { ApiProperty } from '@nestjs/swagger';
import { OptionalNumber } from '../decorators';

export class MacrosReqDto {
  @OptionalNumber({ description: 'Calories per 100g', example: 59.5 })
  calories?: number;

  @OptionalNumber({ description: 'Carbohydrates per 100g', example: 45 })
  carbohydrates?: number;

  @OptionalNumber({ description: 'Fat per 100g', example: 0.4 })
  fat?: number;

  @OptionalNumber({ description: 'Fiber per 100g', example: 1.1 })
  fiber?: number;

  @OptionalNumber({ description: 'Protein per 100g', example: 10.3 })
  protein?: number;

  @OptionalNumber({ description: 'Sugar per 100g', example: 3.2 })
  sugar?: number;
}

export class MacrosResDto {
  @ApiProperty({ type: Number, nullable: true, example: 59.5 })
  calories?: number;

  @ApiProperty({ type: String, nullable: true, example: 45 })
  carbohydrates?: number;

  @ApiProperty({ type: Number, nullable: true, example: 0.4 })
  fat?: number;

  @ApiProperty({ type: Number, nullable: true, example: 1.1 })
  fiber?: number;

  @ApiProperty({ type: Number, nullable: true, example: 10.3 })
  protein?: number;

  @ApiProperty({ type: Number, nullable: true, example: 3.2 })
  sugar?: number;
}

export class MacrosFilterReqDto {
  @OptionalNumber({ description: 'calories less than', example: 25 })
  calories_lte?: number;
  @OptionalNumber({ description: 'calories higher than', example: 25 })
  calories_gte?: number;

  @OptionalNumber({ description: 'carbohydrates less than', example: 25 })
  carbohydrates_lte?: number;
  @OptionalNumber({ description: 'carbohydrates higher than', example: 25 })
  carbohydrates_gte?: number;

  @OptionalNumber({ description: 'fat less than', example: 25 })
  fat_lte?: number;
  @OptionalNumber({ description: 'fat higher than', example: 25 })
  fat_gte?: number;

  @OptionalNumber({ description: 'protein less than', example: 25 })
  protein_lte?: number;
  @OptionalNumber({ description: 'protein higher than', example: 25 })
  protein_gte?: number;

  @OptionalNumber({ description: 'fiber less than', example: 25 })
  fiber_lte?: number;
  @OptionalNumber({ description: 'fiber higher than', example: 25 })
  fiber_gte?: number;

  @OptionalNumber({ description: 'sugar less than', example: 25 })
  sugar_lte?: number;
  @OptionalNumber({ description: 'sugar higher than', example: 25 })
  sugar_gte?: number;
}
