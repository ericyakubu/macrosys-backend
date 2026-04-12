import {
  Controller,
  Post,
  Body,
  Patch,
  BadRequestException,
  Delete,
  Param,
  Res,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { UserOnly, User, AdminOnly } from '@/infrastructure/decorators';
import type { SortOrderEnum, UserFromRequest } from '@/shared/types';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateUserMeasurementsReqDto,
  CreateUserMeasurementsResDto,
  MeasurementDto,
  UpdateUserMeasurementsReqDto,
  UpdateUserMeasurementsResDto,
} from './dto/measurements.dto';
import { type Response } from 'express';
import { RoleEnum } from '@/prisma/client';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post('create')
  @UserOnly()
  @ApiBody({ type: CreateUserMeasurementsReqDto })
  async createMeasurement(
    @User() user: UserFromRequest,
    @Body() body: CreateUserMeasurementsReqDto,
  ): Promise<CreateUserMeasurementsResDto> {
    return await this.measurementsService.createMeasurement({ user_id: user.id, body });
  }

  @Get('get/:id')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiOkResponse({ type: MeasurementDto })
  async getMeasurement(@Param('id') id: string): Promise<MeasurementDto> {
    return await this.measurementsService.getMeasurement(id);
  }

  @Get('get-all')
  @UserOnly()
  @ApiOkResponse({ type: [MeasurementDto] })
  async getAllMeasurements(
    // @Query('user_id') user_id: string,
    @User() user: UserFromRequest,
    @Query('sort_order') sort_order?: SortOrderEnum,
  ): Promise<MeasurementDto[]> {
    if (user.role !== RoleEnum.USER) throw new BadRequestException('not allowed');
    return await this.measurementsService.getAllMeasurements({ user_id: user.id, sort_order });
  }

  @Patch('update/:id')
  @UserOnly()
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiBody({ type: UpdateUserMeasurementsReqDto })
  async updateMeasurement(
    @Body() body: UpdateUserMeasurementsReqDto,
    @Param('id') id?: string,
  ): Promise<UpdateUserMeasurementsResDto> {
    return await this.measurementsService.updateMeasurement({ id, body });
  }

  @Delete('delete/:id')
  @UserOnly()
  @AdminOnly()
  @ApiParam({ name: 'id', required: true, type: String })
  async deleteMeasurement(
    @User() user: UserFromRequest,
    @Res() res: Response,
    @Param('id') id?: string,
  ) {
    if (!id) throw new BadRequestException('measurement id is required');
    await this.measurementsService.deleteMeasurement({ user_id: user.id, id });
    return res.send({ message: `Measurement with id ${id} deleted` });
  }
}
