import { Injectable } from '@nestjs/common';
import { DietSourceEnum, RoleEnum } from '@/prisma/client';
import { PrismaService } from '@/prisma.service';
import type { UserFromRequest } from '@/shared/types';
import type {
  AdminGetAllDietsQueryDto,
  CreateDietReqDto,
  DietDto,
  GetAllDietsQueryDto,
  UpdateDietReqDto,
} from './dto/diet.dto';

const select = {
  created_at: true,
  description: true,
  id: true,
  is_active: true,
  is_system: true,
  name: true,
  source: true,
} as const;

@Injectable()
export class DietService {
  constructor(private readonly prismaService: PrismaService) {}
  async adminCreateDiet(createDietDto: CreateDietReqDto, user: UserFromRequest): Promise<DietDto> {
    return this.createDiet(createDietDto, user);
  }

  async adminCreateDietMultiple(
    body: CreateDietReqDto[],
    user: UserFromRequest,
  ): Promise<DietDto[]> {
    const diets = body.map((d) => ({
      ...d,
      created_by: user.id,
      source: DietSourceEnum.STAFF,
    }));

    return await this.prismaService.diet.createManyAndReturn({
      data: diets,
      skipDuplicates: true,
      select,
    });
  }

  async adminGetAllDiets(queries: AdminGetAllDietsQueryDto): Promise<DietDto[]> {
    const { is_active, source, limit, offset, sort_by, sort_order } = queries;
    return await this.prismaService.diet.findMany({
      where: { is_active, source },
      orderBy: { [sort_by]: sort_order },
      take: limit,
      skip: offset,
      select,
    });
  }

  async adminGetOneDiet(id: string): Promise<DietDto> {
    return await this.prismaService.diet.findUnique({
      where: { id },
      select,
    });
  }

  async adminUpdateDiet(id: string, updateDietDto: UpdateDietReqDto): Promise<DietDto> {
    return await this.prismaService.diet.update({
      where: { id },
      data: updateDietDto,
      select,
    });
  }

  async trainerGetAllDiets(
    queries: GetAllDietsQueryDto,
    user: UserFromRequest,
  ): Promise<DietDto[]> {
    const { is_active, limit, offset, sort_by, sort_order } = queries;
    return await this.prismaService.diet.findMany({
      where: { is_active, trainer_id: user.id },
      orderBy: { [sort_by]: sort_order },
      take: limit,
      skip: offset,
      select,
    });
  }

  async trainerGetOneDiet(id: string, user: UserFromRequest): Promise<DietDto> {
    return await this.prismaService.diet.findUnique({
      where: { id, trainer_id: user.id },
      select,
    });
  }

  async trainerUpdateDiet(
    id: string,
    updateDietDto: UpdateDietReqDto,
    user: UserFromRequest,
  ): Promise<DietDto> {
    return await this.prismaService.diet.update({
      where: { id, trainer_id: user.id },
      data: updateDietDto,
      select,
    });
  }

  private async createDiet(
    createDietDto: CreateDietReqDto,
    user: UserFromRequest,
  ): Promise<DietDto> {
    const isStaff = user.role === RoleEnum.ADMIN || user.role === RoleEnum.MODERATOR;

    return await this.prismaService.diet.create({
      data: {
        ...createDietDto,
        created_by: user.id,
        source: isStaff ? DietSourceEnum.STAFF : DietSourceEnum.TRAINER,
        ...(!isStaff && {
          trainer: {
            connect: {
              id: user.id,
            },
          },
        }),
      },
      select,
    });
  }
}
