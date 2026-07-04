import { BadRequestException, Body, Controller, Param, Patch } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { UserOnly } from '@/shared/decorators';
import { UpdateUserReqDto, UpdateUserResDto } from './dto/user.dto';
import { UserService } from './user.service';

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
}
