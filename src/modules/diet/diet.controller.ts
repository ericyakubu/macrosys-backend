import { Body, Controller, Post } from '@nestjs/common';
import { DietService } from './diet.service';
import type { CreateDietReqDto } from './dto/diet.dto';
import { User } from '@/infrastructure/decorators';
import type { UserFromRequest } from '@/shared/types';
// import { CreateDietReqDto, UpdateDietReqDto, type DietDto } from './dto/diet.dto';

@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  create(@Body() createDietDto: CreateDietReqDto, @User() user: UserFromRequest) {
    return this.dietService.adminCreateDiet(createDietDto, user);
  }

  // @Get()
  // findAll() {
  //   return this.dietService.adminFindAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dietService.adminFindOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDietDto: UpdateDietReqDto): Promise<DietDto> {
  //   return this.dietService.adminUpdate(+id, updateDietDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.dietService.adminDelete(+id);
  // }
}
