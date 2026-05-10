import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import type { UpdateUserReqDto, UpdateUserResDto } from './dto/user.dto';
// import type {
//   CreateUserMeasurementsReqDto,
//   CreateUserMeasurementsResDto,
// } from '../measurements/dto/measurements.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateUser(id: string, body: UpdateUserReqDto): Promise<UpdateUserResDto> {
    return this.prismaService.user.update({ where: { id }, data: body });
  }

  // async createMeasurement({
  //   user_id,
  //   body,
  // }: {
  //   user_id: string;
  //   body: CreateUserMeasurementsReqDto;
  // }): Promise<CreateUserMeasurementsResDto> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { id: user_id },
  //   });

  //   if (!user) throw new Error('User not found');

  //   const bmi = this.calculateBmi(body.weight_kg, body.height_cm);

  //   const measurement = this.prismaService.userMeasurements.create({
  //     data: { ...body, bmi, user: { connect: { id: user_id } } },
  //     select: { id: true, bmi: true, body_fat: true, height_cm: true, weight_kg: true },
  //   });

  //   return measurement;
  // }

  private calculateBmi(weight_kg?: number, height_cm?: number): number | null {
    if (!weight_kg || !height_cm) return null;

    return Number((weight_kg / Math.pow(height_cm / 100, 2)).toFixed(1));
  }
}
