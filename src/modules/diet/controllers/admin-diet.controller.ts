import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminOnly, User } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { DietService } from '../diet.service';
import {
  CreateDietReqDto,
  DietDto,
  AdminGetAllDietsQueryDto,
  type UpdateDietReqDto,
} from '../dto/diet.dto';

@ApiTags('Diet - Admin')
@Controller('admin/diet')
export class AdminDietController {
  constructor(private readonly dietService: DietService) {}

  @Post('create')
  @AdminOnly()
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
  async update(@Param('id') id: string, @Body() updateDietDto: UpdateDietReqDto) {
    return this.dietService.adminUpdateDiet(id, updateDietDto);
  }

  @Get('get-all')
  @AdminOnly()
  @ApiExtraModels(AdminGetAllDietsQueryDto)
  @ApiOkResponse({ type: [DietDto] })
  async getAll(@Query() queries: AdminGetAllDietsQueryDto) {
    const { limit, offset } = queries;
    const limitNumber = limit ? +limit : undefined;
    const offsetNumber = offset ? +offset : undefined;
    return this.dietService.adminGetAllDiets({
      ...queries,
      limit: limitNumber,
      offset: offsetNumber,
    });
  }

  @Get('get-one/:id')
  @AdminOnly()
  @ApiOkResponse({ type: DietDto })
  async getOne(@Param('id') id: string) {
    return this.dietService.adminGetOneDiet(id);
  }
}
