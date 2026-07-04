import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminOnly, TrainerOnly, User } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { DietService } from '../diet.service';
import {
  CreateDietReqDto,
  DietDto,
  GetAllDietsQueryDto,
  type UpdateDietReqDto,
} from '../dto/diet.dto';

@ApiTags('Diet - Trainer')
@Controller('trainer/diet')
export class TrainerDietController {
  constructor(private readonly dietService: DietService) {}

  @Post('create')
  @TrainerOnly()
  @ApiBody({ type: CreateDietReqDto })
  @ApiOkResponse({ type: DietDto })
  @ApiOperation({
    summary: 'Create a Diet',
    description:
      'Accessible by admin only. After creating a diet, it will be available for all users. Created diet will have source set to STAFF.',
  })
  async create(@Body() createDietDto: CreateDietReqDto, @User() user: UserFromRequest) {
    return this.dietService.adminCreateDiet(createDietDto, user);
  }

  @Patch('update/:id')
  @AdminOnly()
  @ApiBody({ type: CreateDietReqDto })
  @ApiOkResponse({ type: DietDto })
  async update(
    @User() user: UserFromRequest,
    @Param('id') id: string,
    @Body() updateDietDto: UpdateDietReqDto,
  ) {
    return this.dietService.trainerUpdateDiet(id, updateDietDto, user);
  }

  @Get('get-all')
  @TrainerOnly()
  @ApiExtraModels(GetAllDietsQueryDto)
  @ApiOkResponse({ type: [DietDto] })
  async getAll(@User() user: UserFromRequest, @Query() queries: GetAllDietsQueryDto) {
    const { limit, offset } = queries;
    const limitNumber = limit ? +limit : undefined;
    const offsetNumber = offset ? +offset : undefined;
    return this.dietService.trainerGetAllDiets(
      {
        ...queries,
        limit: limitNumber,
        offset: offsetNumber,
      },
      user,
    );
  }

  @Get('get-one/:id')
  @TrainerOnly()
  @ApiOkResponse({ type: DietDto })
  async getOne(@User() user: UserFromRequest, @Param('id') id: string) {
    return this.dietService.trainerGetOneDiet(id, user);
  }
}
