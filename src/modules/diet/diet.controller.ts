import { Controller, Post, Body, Patch, Param, Get, Query, Delete } from '@nestjs/common';
import { DietService } from './diet.service';
import { CreateDietReqDto } from './dto/create-diet.dto';
import { ApiBody, ApiExtraModels, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminOnly } from '@/shared/decorators';
import { DietDto } from './dto/diet.dto';
import { UpdateDietReqDto } from './dto/update-diet.dto';
import { GetDietsReqDto, GetDietsResDto } from './dto/get-diets.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  @ApiBody({ type: CreateDietReqDto })
  @AdminOnly()
  @ApiResponse({ type: DietDto })
  async create(@Body() createDietDto: CreateDietReqDto) {
    return await this.dietService.create(createDietDto);
  }

  @Get()
  @ApiResponse({ type: GetDietsResDto })
  @ApiExtraModels(GetDietsReqDto)
  async findAll(@Query() queries: GetDietsReqDto) {
    return await this.dietService.findAll(queries);
  }

  @Get(':id')
  @ApiResponse({ type: DietDto })
  @ApiParam({ name: 'id', type: String })
  async findOne(@Param('id') id: string) {
    return await this.dietService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateDietReqDto })
  @AdminOnly()
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: DietDto })
  async update(@Param('id') id: string, @Body() updateDietDto: UpdateDietReqDto) {
    return await this.dietService.update(id, updateDietDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id') id: string) {
    return await this.dietService.remove(id);
  }
}
