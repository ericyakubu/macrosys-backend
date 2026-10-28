import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateDietDto } from './dto/create-diet.dto';
import { PrismaService } from '@/prisma.service';
import { AppException } from '@/shared/errors/app.exception';
import { DietError } from './diet.errors';
import { resolveConflicts } from '@/shared/diets/resolve-conflicts';

@Injectable()
export class DietService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDietDto: CreateDietDto) {
    console.log(createDietDto);
    return 'This action adds a new diet';
  }

  /** Проверяет, что диеты существуют, и убирает конфликты (поздние вытесняют ранние) */
  async resolve(orderedIds: string[]): Promise<string[]> {
    const requested = [...new Set(orderedIds)];
    if (requested.length === 0) return [];

    const diets = await this.prisma.diet.findMany({
      where: { id: { in: requested } },
      select: {
        id: true,
        conflicts_with: { select: { id: true } },
        conflicted_by: { select: { id: true } },
      },
    });

    const found = new Set(diets.map((d) => d.id));
    const missing = requested.filter((id) => !found.has(id));
    if (missing.length > 0) {
      throw new AppException(DietError.NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY, {
        diet_ids: missing,
      });
    }

    const conflicts = new Map(
      diets.map((d) => [d.id, new Set([...d.conflicts_with, ...d.conflicted_by].map((c) => c.id))]),
    );
    return resolveConflicts(requested, conflicts);
  }

  /** Диеты, которые подходят ВСЕМ переданным продуктам */
  intersect(dietIdLists: string[][]): string[] {
    if (dietIdLists.length === 0) return [];
    const [first, ...rest] = dietIdLists.map((list) => new Set(list));
    return [...first].filter((id) => rest.every((set) => set.has(id)));
  }
}
