import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IsExactlyOneOf, OptionalNumber } from '@/shared/decorators';
import { SortOrderEnum } from '@/shared/types';
import { MacrosResDto } from '@/shared/dto';
import { RecipeDietResDto } from '../../dto';
import { Transform } from 'class-transformer';

const ToBoolean = () =>
  Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;

    return value;
  });

export enum RecipeSortByEnum {
  NAME = 'name',
  CREATED_AT = 'created_at',
  COOK_TIME = 'cook_time',
  PREP_TIME = 'prep_time',
  SERVINGS = 'servings',
  CALORIES = 'calories',
  CARBOHYDRATES = 'carbohydrates',
  FIBER = 'fiber',
  FAT = 'fat',
  PROTEIN = 'protein',
  SUGAR = 'sugar',
}

export class RecipeProductReqDto {
  @ApiProperty({ type: String, nullable: true, description: 'User product id', example: null })
  @IsUUID()
  @IsOptional()
  user_product_id: string;

  @ApiProperty({ type: String, nullable: true, description: 'Base product id', example: null })
  @IsUUID()
  @IsOptional()
  product_id: string;

  @IsExactlyOneOf(['product_id', 'user_product_id'])
  private readonly _validation!: never;

  @ApiProperty({
    type: Number,
    nullable: true,
    description: 'Product quantity in grams',
    example: 175,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class RecipeProductResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true, description: 'Image url' })
  url: string;

  @ApiProperty({ type: Number, description: 'Product quantity in grams' })
  quantity: number;

  @ApiProperty({ type: [String] })
  diets: string[];
}

export class GetRecipeQueryDto {
  @ApiPropertyOptional({
    type: Boolean,
    description: 'Include products in response',
  })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  products?: boolean;

  @ApiPropertyOptional({ type: Boolean, description: 'Include diets in response' })
  @IsOptional()
  @ToBoolean()
  @IsBoolean()
  diets?: boolean;
}

export class GetRecipeQueryResDto extends MacrosResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  instructions: string;

  @ApiProperty({ type: Number })
  cook_time: number;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: Number })
  prep_time: number;

  @ApiProperty({ type: Number })
  servings: number;

  @ApiPropertyOptional({ type: [RecipeProductResDto] })
  products?: RecipeProductResDto[];

  @ApiPropertyOptional({ type: [RecipeDietResDto] })
  diets?: RecipeDietResDto[];
}

export class GetAllRecipesQueryDto extends GetRecipeQueryDto {
  @OptionalNumber({ description: 'limit results to this number of diets per page', example: 25 })
  limit?: number;

  @OptionalNumber({ description: 'offset results by this number of diets per page', example: 0 })
  offset?: number;

  @ApiPropertyOptional({
    description: 'Field used for sorting results. Defaults to created_at if not provided',
    enum: RecipeSortByEnum,
    example: RecipeSortByEnum.NAME,
  })
  @IsOptional()
  @IsEnum(RecipeSortByEnum)
  sort_by?: RecipeSortByEnum;

  @ApiPropertyOptional({
    description: 'Sort direction. Use asc for oldest/smallest first, desc for newest/largest first',
    enum: SortOrderEnum,
    example: SortOrderEnum.DESC,
  })
  @IsOptional()
  @IsEnum(SortOrderEnum)
  sort_order?: SortOrderEnum;
}
