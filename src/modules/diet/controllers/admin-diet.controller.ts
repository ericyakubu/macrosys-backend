import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DietService } from '../diet.service';
import { CreateDietReqDto, DietDto, UpdateDietReqDto } from '../dto/diet.dto';
import { AdminOnly, User } from '@/infrastructure/decorators';
import type { UserFromRequest } from '@/shared/types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('admin/diet')
export class AdminDietController {
  constructor(private readonly dietService: DietService) {}

  @Post('create')
  @AdminOnly()
  @ApiBody({ type: CreateDietReqDto })
  @ApiOkResponse({ type: DietDto })
  create(@Body() createDietDto: CreateDietReqDto, @User() user: UserFromRequest) {
    return this.dietService.adminCreateDiet(createDietDto, user);
  }

  @Get()
  @AdminOnly()
  findAll() {
    return this.dietService.adminFindAll();
  }

  @Get(':id')
  @AdminOnly()
  findOne(@Param('id') id: string) {
    return this.dietService.adminFindOne(+id);
  }

  @Patch(':id')
  @AdminOnly()
  update(@Param('id') id: string, @Body() updateDietDto: UpdateDietReqDto) {
    return this.dietService.adminUpdate(+id, updateDietDto);
  }

  @Delete(':id')
  @AdminOnly()
  remove(@Param('id') id: string) {
    return this.dietService.adminDelete(id);
  }
}
