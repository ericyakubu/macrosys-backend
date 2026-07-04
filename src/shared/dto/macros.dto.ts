import { ApiProperty } from '@nestjs/swagger';
import { OptionalNumber } from '../decorators';

export class MacrosReqDto {
  @OptionalNumber('Calories per 100g', 59.5)
  calories?: number;

  @OptionalNumber('Carbohydrates per 100g', 45)
  carbohydrates?: number;

  @OptionalNumber('Fat per 100g', 0.4)
  fat?: number;

  @OptionalNumber('Fiber per 100g', 1.1)
  fiber?: number;

  @OptionalNumber('Protein per 100g', 10.3)
  protein?: number;

  @OptionalNumber('Sugar per 100g', 3.2)
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
  @OptionalNumber('calories less than', 25)
  calories_lte?: number;
  @OptionalNumber('calories higher than', 25)
  calories_gte?: number;

  @OptionalNumber('carbohydrates less than', 25)
  carbohydrates_lte?: number;
  @OptionalNumber('carbohydrates higher than', 25)
  carbohydrates_gte?: number;

  @OptionalNumber('fat less than', 25)
  fat_lte?: number;
  @OptionalNumber('fat higher than', 25)
  fat_gte?: number;

  @OptionalNumber('protein less than', 25)
  protein_lte?: number;
  @OptionalNumber('protein higher than', 25)
  protein_gte?: number;

  @OptionalNumber('fiber less than', 25)
  fiber_lte?: number;
  @OptionalNumber('fiber higher than', 25)
  fiber_gte?: number;

  @OptionalNumber('sugar less than', 25)
  sugar_lte?: number;
  @OptionalNumber('sugar higher than', 25)
  sugar_gte?: number;
}
