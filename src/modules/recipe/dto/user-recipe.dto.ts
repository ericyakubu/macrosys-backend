import { IsArray, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { IsExactlyOneOf } from '@/shared/decorators';
import { CreateRecipeBase } from './recipe.dto';

export class UserRecipeProductReqDto {
  @IsUUID()
  @IsOptional()
  user_product_id: string;

  @IsUUID()
  @IsOptional()
  product_id: string;

  @IsExactlyOneOf(['product_id', 'user_product_id'])
  private readonly _validation!: never;

  @IsNumber()
  quantity: number;
}

export class CreateUserRecipeReqDto extends CreateRecipeBase {
  @IsArray({ each: true })
  products: UserRecipeProductReqDto[];
}
