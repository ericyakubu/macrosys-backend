import { Controller, Post, Body, Get, Query, Param, Patch, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeReqDto } from './dto/create-recipe.dto';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from '@/prisma/client';
import { Auth, User } from '@/shared/decorators';
import type { AuthUser } from '@/shared/types';
import { GetRecipeReqDto } from './dto/get-recipe.dto';
import type { UpdateRecipeReqDto } from './dto/update-product.dto';
import { RecipeDto } from './dto/recipe.dto';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiBody({ type: CreateRecipeReqDto })
  @ApiResponse({ type: RecipeDto })
  async create(@Body() body: CreateRecipeReqDto, @User() user: AuthUser) {
    return await this.recipeService.create(body, user);
  }

  @Get()
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiExtraModels(GetRecipeReqDto)
  @ApiResponse({ type: [RecipeDto] })
  async findAll(@User() user: AuthUser, @Query() queries: GetRecipeReqDto) {
    return await this.recipeService.findAll(queries, user);
  }

  @Get(':id')
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id') id: string, @User() user: AuthUser) {
    return this.recipeService.findOne(id, user);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateRecipeReqDto, @User() user: AuthUser) {
    return await this.recipeService.update(id, body, user);
  }

  @Delete(':id')
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id') id: string, @User() user: AuthUser) {
    return await this.recipeService.remove(id, user);
  }
}
