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
  UploadedFile,
  Query,
  UseInterceptors,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { UserOnly, User, AdminOnly } from '@/infrastructure/decorators';
import { type UserFromRequest } from '@/shared/types';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import {
  CreateUserMeasurementsReqDto,
  CreateUserMeasurementsResDto,
  GetAllMeasurementsQueryDto,
  MeasurementDto,
  UpdateUserMeasurementsReqDto,
  UpdateUserMeasurementsResDto,
} from './dto/measurements.dto';
import { type Response } from 'express';
import { RoleEnum } from '@/prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';
import { HeadersInterceptor } from '@/infrastructure/interceptors/headers.interceptor';

@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post('create')
  @UserOnly()
  @ApiBody({ type: CreateUserMeasurementsReqDto })
  @UseInterceptors(FileInterceptor('photo'), HeadersInterceptor)
  // @ApiHeader({ name: 'Content-Type', required: true, example: 'multipart/form-data' })
  async createMeasurement(
    @User() user: UserFromRequest,
    @Body() body: CreateUserMeasurementsReqDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    photo?: Express.Multer.File,
  ): Promise<CreateUserMeasurementsResDto> {
    return await this.measurementsService.createMeasurement({ user_id: user.id, body, photo });
  }

  @Get('get/:id')
  @UserOnly()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiOkResponse({ type: MeasurementDto })
  async getMeasurement(@Param('id') id: string): Promise<MeasurementDto> {
    return await this.measurementsService.getMeasurement(id);
  }

  @ApiExtraModels(GetAllMeasurementsQueryDto)
  @Get('get-all')
  @UserOnly()
  @ApiOkResponse({ type: [MeasurementDto] })
  // @ApiQuery({ name: 'sort_order', required: false, enum: SortOrderEnum })
  async getAllMeasurements(
    @User() user: UserFromRequest,
    // @Query('sort_order') sort_order?: SortOrderEnum,
    @Query() query: GetAllMeasurementsQueryDto,
  ): Promise<MeasurementDto[]> {
    if (user.role !== RoleEnum.USER) throw new BadRequestException('not allowed');
    return await this.measurementsService.getAllMeasurements({ user_id: user.id, ...query });
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
