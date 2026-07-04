import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User, UserOnly } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { CreateUserRecipeReqDto } from '../dto';
import { RecipeService } from '../recipe.service';

@ApiTags('Recipe - User')
@Controller('user/recipe')
export class UserRecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UserOnly()
  @Post()
  @ApiBody({
    type: CreateUserRecipeReqDto,
    description: `when creating recipe, each product should only have either user_product_id or product_id, but not both and one of them is required.
    Also, all macros are optional, it is recommended that user doesn't set them and they will be calculated automatically`,
  })
  async createRecipe(@Body() body: CreateUserRecipeReqDto, @User() user: UserFromRequest) {
    return await this.recipeService.createUserRecipe(body, user);
  }
}
