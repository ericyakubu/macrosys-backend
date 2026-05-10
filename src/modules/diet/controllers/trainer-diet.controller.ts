import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DietService } from '../diet.service';
import { CreateDietReqDto, DietDto, UpdateDietReqDto } from '../dto/diet.dto';
import { TrainerOnly, User } from '@/infrastructure/decorators';
import type { UserFromRequest } from '@/shared/types';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('trainer/diet')
export class TrainerDietController {
  constructor(private readonly dietService: DietService) {}

  @Post('create')
  @TrainerOnly()
  @ApiBody({ type: CreateDietReqDto })
  @ApiOkResponse({ type: DietDto })
  create(@Body() createDietDto: CreateDietReqDto, @User() user: UserFromRequest) {
    return this.dietService.trainerCreateDiet(createDietDto, user);
  }

  @Get('get-all')
  @TrainerOnly()
  findAll() {
    return this.dietService.trainerFindAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dietService.trainerFindOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDietDto: UpdateDietReqDto) {
    return this.dietService.trainerUpdate(+id, updateDietDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dietService.trainerDelete(id);
  }
}
