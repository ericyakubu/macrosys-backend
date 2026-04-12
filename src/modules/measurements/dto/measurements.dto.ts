import type { UserMeasurements } from '@/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateUserMeasurementsReqDto implements Partial<UserMeasurements> {
  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  body_fat?: number;

  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  @IsOptional()
  height_cm?: number;

  @IsOptional()
  @ApiProperty({ type: Number, nullable: true })
  @IsNumber()
  weight_kg?: number;
}

export class CreateUserMeasurementsResDto implements Partial<UserMeasurements> {
  @ApiProperty({ type: Number, nullable: true })
  body_fat: number | null;

  @ApiProperty({ type: Number, nullable: true })
  height_cm: number | null;

  @ApiProperty({ type: Number, nullable: true })
  weight_kg: number | null;

  @ApiProperty({ type: String, nullable: true })
  id: string;

  @ApiProperty({ type: String, nullable: true })
  bmi: number | null;
}

// export class UpdateUserStatsReqDto implements Partial<UserMeasurements> {
//   @IsOptional()
//   @ApiProperty({ type: Number, nullable: true })
//   @IsNumber()
//   body_fat?: number;

//   @ApiProperty({ type: Number, nullable: true })
//   @IsNumber()
//   @IsOptional()
//   height_cm?: number;

//   @IsOptional()
//   @ApiProperty({ type: Number, nullable: true })
//   @IsNumber()
//   weight_kg?: number;
// }

export class UpdateUserMeasurementsReqDto extends CreateUserMeasurementsReqDto {}
export class UpdateUserMeasurementsResDto extends CreateUserMeasurementsResDto {}

export class MeasurementDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: Number, nullable: true })
  weight_kg: number | null;

  @ApiProperty({ type: Number, nullable: true })
  body_fat: number | null;

  @ApiProperty({ type: Number, nullable: true })
  height_cm: number | null;

  @ApiProperty({ type: Number, nullable: true })
  bmi: number | null;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: String, nullable: true })
  photo: string | null;
}
