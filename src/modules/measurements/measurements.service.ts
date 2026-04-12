import { BadRequestException, Injectable } from '@nestjs/common';
import type {
  CreateUserMeasurementsReqDto,
  CreateUserMeasurementsResDto,
  MeasurementDto,
} from './dto/measurements.dto';
import { PrismaService } from '@/prisma.service';
import type { SortOrderEnum } from '@/shared/types';

@Injectable()
export class MeasurementsService {
  constructor(private readonly prismaService: PrismaService) {}
  async createMeasurement({
    user_id,
    body,
  }: {
    user_id: string;
    body: CreateUserMeasurementsReqDto;
  }): Promise<CreateUserMeasurementsResDto> {
    const user = await this.prismaService.user.findUnique({
      where: { id: user_id },
    });

    if (!user) throw new Error('User not found');

    const bmi = this.calculateBmi(body.weight_kg, body.height_cm);

    const measurement = this.prismaService.userMeasurements.create({
      data: { ...body, bmi, user: { connect: { id: user_id } } },
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

  async getAllMeasurements({
    user_id,
    sort_order,
  }: {
    user_id: string;
    sort_order?: SortOrderEnum;
  }): Promise<MeasurementDto[]> {
    const fromDB = await this.prismaService.userMeasurements.findMany({
      where: { user: { id: user_id } },
      select: {
        id: true,
        bmi: true,
        body_fat: true,
        created_at: true,
        height_cm: true,
        weight_kg: true,
        photo: true,
      },
      ...(sort_order && { orderBy: { created_at: sort_order } }),
    });

    const measurements = fromDB.map((measurement) => ({
      ...measurement,
      photo: measurement.photo.url,
    }));

    return measurements;
  }

  async updateMeasurement({
    body,
    id,
  }: {
    id: string;
    body: CreateUserMeasurementsReqDto;
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
