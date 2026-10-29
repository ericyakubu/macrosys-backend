import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDietReqDto } from './dto/create-diet.dto';
import { PrismaService } from '@/prisma.service';
import { AppException } from '@/shared/errors/app.exception';
import { DietError } from './diet.errors';
import type { UpdateDietReqDto } from './dto/update-diet.dto';
import type { DietDto } from './dto/diet.dto';
import type { GetDietsReqDto, GetDietsResDto } from './dto/get-diets.dto';
import { Prisma } from '@/prisma/client';

@Injectable()
export class DietService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly include = {
    conflicts_with: { select: { id: true, name: true } },
    conflicted_by: { select: { id: true, name: true } },
  } as const;

  // 1. all ids must exist
  private async assertDietsExist(ids: string[]) {
    if (!ids.length) return;
    const found = await this.prisma.diet.count({ where: { id: { in: ids } } });
    if (found !== ids.length) {
      throw new AppException(
        DietError.CONFLICTING_DIETS_DONT_EXIST,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  // 2. merge both relation sides into one list for the API response
  // TODO revisit this one. only admins need to see conflicts
  private toResponse(diet: {
    id: string;
    name: string;
    description: string | null;
    conflicts_with: { id: string; name: string }[];
    conflicted_by: { id: string; name: string }[];
  }) {
    const { conflicts_with, conflicted_by, ...rest } = diet;
    const conflicts = [
      ...new Map([...conflicts_with, ...conflicted_by].map((d) => [d.id, d])).values(),
    ];
    return { ...rest, conflicts };
  }

  async create(body: CreateDietReqDto): Promise<DietDto> {
    const ids = body.conflicts_with ?? [];
    await this.assertDietsExist(ids);

    const diet = await this.prisma.diet.create({
      data: {
        name: body.name,
        description: body.description,
        conflicts_with: { connect: ids.map((id) => ({ id })) },
      },
      include: this.include,
    });

    return this.toResponse(diet);
  }

  async update(id: string, body: UpdateDietReqDto): Promise<DietDto> {
    const exists = await this.prisma.diet.findUnique({ where: { id }, select: { id: true } });
    if (!exists) throw new AppException(DietError.NOT_FOUND, HttpStatus.NOT_FOUND);

    const ids = body.conflicts_with;
    if (ids?.includes(id)) {
      throw new AppException(DietError.SELF_CONFLICT, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (ids) await this.assertDietsExist(ids);

    const diet = await this.prisma.diet.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        // only touch conflicts if the client sent the field
        ...(ids && {
          conflicts_with: { set: ids.map((x) => ({ id: x })) },
          conflicted_by: { set: [] }, // clear the other side so the list fully replaces
        }),
      },
      include: this.include,
    });

    return this.toResponse(diet);
  }

  async findAll(queries: GetDietsReqDto): Promise<GetDietsResDto> {
    const filters = {
      ...(queries.limit && { take: queries.limit }),
      ...(queries.offset && { skip: queries.offset }),
      ...(queries.sort_by &&
        queries.sort_order && { orderBy: { [queries.sort_by]: queries.sort_order } }),
    };

    const where: Prisma.DietWhereInput = {
      archived_at: null, // hide archived diets; remove if you don't want this
    };

    const [diets, total] = await this.prisma.$transaction([
      this.prisma.diet.findMany({
        where,
        ...filters,
        include: this.include,
      }),
      this.prisma.diet.count({ where }),
    ]);

    const items = diets.map((diet) => this.toResponse(diet));

    return { diets: items, total };
  }

  async findOne(id: string): Promise<DietDto> {
    const diet = await this.prisma.diet.findUniqueOrThrow({
      where: { id, archived_at: null },
      include: this.include,
    });
    return this.toResponse(diet);
  }

  async remove(id: string) {
    await this.prisma.diet.update({ where: { id }, data: { archived_at: new Date() } });
    return { archived: true };
  }
}
