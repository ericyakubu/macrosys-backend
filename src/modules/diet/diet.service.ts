import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import type { CreateDietReqDto, DietDto, UpdateDietReqDto } from './dto/diet.dto';
import type { UserFromRequest } from '@/shared/types';

@Injectable()
export class DietService {
  constructor(private readonly prismaService: PrismaService) {}
  async adminCreateDiet(createDietDto: CreateDietReqDto, user: UserFromRequest): Promise<DietDto> {
    return this.createDiet(createDietDto, user);
  }

  async adminFindAll() {
    return await `This action returns all diet`;
  }

  async adminFindOne(id: number) {
    return await `This action returns a #${id} diet`;
  }

  async adminUpdate(id: number, updateDietDto: UpdateDietReqDto) {
    return updateDietDto;
  }

  async adminDelete(id: string) {
    return await `This action removes a #${id} diet`;
  }
  async trainerCreateDiet(createDietDto: CreateDietReqDto, user: UserFromRequest) {
    return this.createDiet(createDietDto, user);
  }

  async trainerFindAll() {
    return await `This action returns all diet`;
  }

  async trainerFindOne(id: number) {
    return await `This action returns a #${id} diet`;
  }

  async trainerUpdate(id: number, updateDietDto: UpdateDietReqDto) {
    return await updateDietDto;
  }

  async trainerDelete(id: string) {
    return await `This action removes a #${id} diet`;
  }

  private async createDiet(
    createDietDto: CreateDietReqDto,
    user: UserFromRequest,
  ): Promise<DietDto> {
    const isStaff = user.role === 'ADMIN' || user.role === 'MODERATOR';
    return await this.prismaService.diet.create({
      data: { ...createDietDto, created_by: user.id, source: isStaff ? 'STAFF' : 'TRAINER' },
      select: {
        created_at: true,
        description: true,
        id: true,
        is_active: true,
        is_system: true,
        name: true,
        source: true,
      },
    });
  }
}
