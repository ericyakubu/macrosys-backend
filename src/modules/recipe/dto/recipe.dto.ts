import { ShortDietDto } from '@/shared/dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: Number })
  grams: number;
}

export class RecipeDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  instructions: string;

  @ApiProperty({ type: String })
  photo_url: string;

  @ApiProperty({ type: Number })
  calories: number;

  @ApiProperty({ type: Number })
  protein: number;

  @ApiProperty({ type: Number })
  fat: number;

  @ApiProperty({ type: Number })
  carbohydrates: number;

  @ApiProperty({ type: Number })
  fiber: number;

  @ApiProperty({ type: Number })
  sugar: number;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: [ShortDietDto] })
  diets: ShortDietDto[];

  @ApiProperty({ type: [IngredientDto] })
  ingredients: IngredientDto[];

  @ApiPropertyOptional({ type: String, nullable: true })
  owner_user_id: string | null;

  @ApiPropertyOptional({ type: String, nullable: true })
  owner_trainer_id: string | null;
}
