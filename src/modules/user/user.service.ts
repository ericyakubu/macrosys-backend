import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import type { UpdateUserReqDto, UpdateUserResDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUser(id: string, body: UpdateUserReqDto): Promise<UpdateUserResDto> {
    return this.prismaService.user.update({ where: { id }, data: body });
  }
}
