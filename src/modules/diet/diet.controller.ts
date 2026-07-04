import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { DietService } from './diet.service';
import type { CreateDietReqDto } from './dto/diet.dto';

@ApiTags('Diet')
@Controller('diet')
export class DietController {
  constructor(private readonly dietService: DietService) {}

  @Post()
  create(@Body() createDietDto: CreateDietReqDto, @User() user: UserFromRequest) {
    return this.dietService.adminCreateDiet(createDietDto, user);
  }
}
