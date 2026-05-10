import {
  BadRequestException,
  Body,
  Controller,
  // MethodNotAllowedException,
  Param,
  Patch,
  // Post,
  // Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/user.dto';
import {
  ApiBody,
  ApiParam,
  //  ApiQuery
} from '@nestjs/swagger';
import {
  UserOnly,
  // User
} from '@/infrastructure/decorators';
// import {
//   CreateUserMeasurementsReqDto,
//   UpdateUserMeasurementsReqDto,
//   type CreateUserMeasurementsResDto,
//   type UpdateUserMeasurementsResDto,
// } from '../measurements/dto/measurements.dto';
// import type { UserFromRequest } from '@/shared/types';
// import { RoleEnum } from '@/prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update/:id')
  @UserOnly()
  @ApiBody({ type: UpdateUserReqDto })
  @ApiParam({ name: 'id', required: true, type: String })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserReqDto,
  ): Promise<UpdateUserResDto> {
    if (!id) throw new BadRequestException('id is required');
    return await this.userService.updateUser(id, updateUserDto);
  }

  // @Post('create-measurement')
  // @UserOnly()
  // @ApiQuery({ name: 'user_id', required: true, type: String })
  // @ApiBody({ type: CreateUserMeasurementsReqDto })
  // async createMeasurement(
  //   @User() user: UserFromRequest,
  //   @Body() body: CreateUserMeasurementsReqDto,
  //   @Query() user_id?: string,
  // ): Promise<CreateUserMeasurementsResDto> {
  //   if (!user_id) throw new BadRequestException('user_id is required');
  //   if (user.id !== user_id) throw new BadRequestException('user_id is not valid');
  //   if (user.role !== RoleEnum.USER) throw new MethodNotAllowedException('not allowed');
  //   return await this.userService.createMeasurement({ user_id, body });
  // }

  // @Patch('update-measurement/:id')
  // @UserOnly()
  // @ApiQuery({ name: 'user_id', required: true, type: String })
  // @ApiBody({ type: UpdateUserMeasurementsReqDto })
  // async updateMeasurement(
  //   @User() user: UserFromRequest,
  //   @Body() body: UpdateUserMeasurementsReqDto,
  //   @Query() user_id?: string,
  // ): Promise<UpdateUserMeasurementsResDto> {
  //   if (!user_id) throw new BadRequestException('user_id is required');
  //   if (user.id !== user_id) throw new BadRequestException('user_id is not valid');
  //   if (user.role !== RoleEnum.USER) throw new MethodNotAllowedException('not allowed');
  //   return await this.userService.createMeasurement({ user_id, body });
  // }
}
