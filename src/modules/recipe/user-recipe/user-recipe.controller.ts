import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User, UserOnly } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { CreateRecipeResDto, CreateUserRecipeReqDto } from './dto/create-user-recipe.dto';
import { UserRecipeService } from './user-recipe.service';
import { UpdateUserRecipeReqDto, UpdateUserRecipeResDto } from './dto/update-user-recipe.dto';
import {
  GetAllRecipesQueryDto,
  GetRecipeQueryDto,
  GetRecipeQueryResDto,
} from './dto/user-recipe.dto';

@UserOnly()
@ApiTags('Recipe - User')
@Controller('user/recipe')
export class UserRecipeController {
  constructor(private readonly recipeService: UserRecipeService) {}

  @Post('create')
  @ApiBody({
    type: CreateUserRecipeReqDto,
    description: `when creating recipe, each product should only have either user_product_id or product_id, but not both and one of them is required.
    Also, all macros are optional, it is recommended that user doesn't set them and they will be calculated automatically`,
  })
  @ApiOkResponse({ type: CreateRecipeResDto })
  async createRecipe(@Body() body: CreateUserRecipeReqDto, @User() user: UserFromRequest) {
    return await this.recipeService.createUserRecipe(body, user);
  }

  @Patch('update/:id')
  @ApiBody({
    type: UpdateUserRecipeReqDto,
  })
  @ApiOkResponse({ type: UpdateUserRecipeResDto })
  async updateRecipe(
    @Body() body: UpdateUserRecipeReqDto,
    @User() user: UserFromRequest,
    @Param('id') id: string,
  ) {
    return await this.recipeService.updateUserRecipe(body, user, id);
  }

  @Get('get/:id')
  @ApiOkResponse({ type: GetRecipeQueryResDto })
  @ApiExtraModels(GetRecipeQueryDto)
  async getRecipe(
    @Param('id') id: string,
    @User() user: UserFromRequest,
    @Query() queries: GetRecipeQueryDto,
  ) {
    return await this.recipeService.getUserRecipe(id, user, queries);
  }

  @Get('get-all')
  @ApiExtraModels(GetAllRecipesQueryDto)
  @ApiOkResponse({ type: [GetRecipeQueryResDto] })
  async getAllRecipes(@User() user: UserFromRequest, @Query() queries: GetAllRecipesQueryDto) {
    return await this.recipeService.getAllUserRecipes(user, queries);
  }
}
