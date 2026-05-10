import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreateUserMeasurementsReqDto,
  CreateUserMeasurementsResDto,
  MeasurementDto,
  MeasurementSortByEnum,
  UpdateUserMeasurementsReqDto,
} from './dto/measurements.dto';
import { PrismaService } from '@/prisma.service';
import type { SortOrderEnum } from '@/shared/types';
import { CloudinaryService } from '@/infrastructure/cloudinary/cloudinary.service';
import { Express } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

@Injectable()
export class MeasurementsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async createMeasurement({
    user_id,
    body,
    photo,
  }: {
    user_id: string;
    body: CreateUserMeasurementsReqDto;
    photo?: Express.Multer.File;
  }): Promise<CreateUserMeasurementsResDto> {
    let imageUrl: string | null = null;
    if (photo) {
      console.log(photo);
      const uploadResult: any = await this.cloudinaryService.uploadFile(photo);
      imageUrl = uploadResult.secure_url;
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: user_id },
    });

    if (!user) throw new Error('User not found');

    const bmi = this.calculateBmi(body.weight_kg, body.height_cm);

    const measurement = this.prismaService.userMeasurements.create({
      data: {
        ...body,
        bmi,
        user: { connect: { id: user_id } },
        photo: imageUrl ? { create: { url: imageUrl } } : undefined,
      },
      select: { id: true, bmi: true, body_fat: true, height_cm: true, weight_kg: true },
    });

    return measurement;
  }

  async getMeasurement(id: string): Promise<MeasurementDto> {
    const fromDB = await this.prismaService.userMeasurements.findUnique({
      where: { id },
      select: {
        id: true,
        bmi: true,
        body_fat: true,
        created_at: true,
        height_cm: true,
        weight_kg: true,
        photo: true,
      },
    });

    if (!fromDB) throw new BadRequestException('Measurement not found');

    const measurement = {
      ...fromDB,
      photo: fromDB.photo.url,
    };
    return measurement;
  }

  // async getAllMeasurements({
  //   user_id,
  //   sort_order,
  // }: {
  //   user_id: string;
  //   sort_order?: SortOrderEnum;
  // }): Promise<MeasurementDto[]> {
  //   const fromDB = await this.prismaService.userMeasurements.findMany({
  //     where: { user: { id: user_id } },
  //     select: {
  //       id: true,
  //       bmi: true,
  //       body_fat: true,
  //       created_at: true,
  //       height_cm: true,
  //       weight_kg: true,
  //       photo: true,
  //     },
  //     ...(sort_order && { orderBy: { created_at: sort_order } }),
  //   });

  //   const measurements = fromDB.map((measurement) => ({
  //     ...measurement,
  //     photo: measurement.photo.url,
  //   }));

  //   return measurements;
  // }

  async getAllMeasurements({
    user_id,
    has_photo,
    min_weight,
    max_weight,
    min_body_fat,
    max_body_fat,
    min_height,
    max_height,
    min_bmi,
    max_bmi,
    from_date,
    to_date,
    sort_by,
    sort_order,
  }: {
    user_id: string;
    has_photo?: boolean;
    min_weight?: number;
    max_weight?: number;
    min_body_fat?: number;
    max_body_fat?: number;
    min_height?: number;
    max_height?: number;
    min_bmi?: number;
    max_bmi?: number;
    from_date?: string;
    to_date?: string;
    sort_by?: MeasurementSortByEnum;
    sort_order?: SortOrderEnum;
  }): Promise<MeasurementDto[]> {
    const where = {
      user: { id: user_id },

      ...(has_photo === true && {
        photo: {
          isNot: null,
        },
      }),

      ...(min_weight !== undefined || max_weight !== undefined
        ? {
            weight_kg: {
              ...(min_weight !== undefined && { gte: min_weight }),
              ...(max_weight !== undefined && { lte: max_weight }),
            },
          }
        : {}),

      ...(min_body_fat !== undefined || max_body_fat !== undefined
        ? {
            body_fat: {
              ...(min_body_fat !== undefined && { gte: min_body_fat }),
              ...(max_body_fat !== undefined && { lte: max_body_fat }),
            },
          }
        : {}),

      ...(min_height !== undefined || max_height !== undefined
        ? {
            height_cm: {
              ...(min_height !== undefined && { gte: min_height }),
              ...(max_height !== undefined && { lte: max_height }),
            },
          }
        : {}),

      ...(min_bmi !== undefined || max_bmi !== undefined
        ? {
            bmi: {
              ...(min_bmi !== undefined && { gte: min_bmi }),
              ...(max_bmi !== undefined && { lte: max_bmi }),
            },
          }
        : {}),

      ...(from_date || to_date
        ? {
            created_at: {
              ...(from_date && { gte: new Date(from_date) }),
              ...(to_date && { lte: new Date(to_date) }),
            },
          }
        : {}),
    };

    const fromDB = await this.prismaService.userMeasurements.findMany({
      where,
      select: {
        id: true,
        bmi: true,
        body_fat: true,
        created_at: true,
        height_cm: true,
        weight_kg: true,
        photo: true,
      },
      orderBy: {
        [sort_by ?? 'created_at']: sort_order ?? 'desc',
      },
    });

    return fromDB.map((measurement) => ({
      ...measurement,
      photo: measurement.photo?.url ?? null,
    }));
  }

  async updateMeasurement({
    body,
    id,
  }: {
    id: string;
    body: UpdateUserMeasurementsReqDto;
  }): Promise<CreateUserMeasurementsResDto> {
    const prior = await this.prismaService.userMeasurements.findUnique({
      where: { id },
    });

    if (!prior) throw new BadRequestException('Measurement not found');

    const updated = { ...prior, ...body };

    const bmi = this.calculateBmi(updated.weight_kg, updated.height_cm);

    const measurement = this.prismaService.userMeasurements.update({
      where: { id },
      data: { ...updated, bmi },
      select: { id: true, bmi: true, body_fat: true, height_cm: true, weight_kg: true },
    });

    return measurement;
  }

  async deleteMeasurement({ user_id, id }: { user_id: string; id: string }) {
    try {
      await this.prismaService.userMeasurements.delete({
        where: { id, user: { id: user_id } },
      });
      return `Measurement with id ${id} has been deleted`;
    } catch {
      throw new BadRequestException('Measurement not found');
    }
  }

  private calculateBmi(weight_kg?: number, height_cm?: number): number | null {
    if (!weight_kg || !height_cm) return null;

    return Number((weight_kg / Math.pow(height_cm / 100, 2)).toFixed(1));
  }
}
