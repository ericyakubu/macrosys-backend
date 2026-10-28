import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { CreateAccountResDto } from './create-account.dto';
import { ActivityLevelEnum } from '@/prisma/client';

export class LoginReqDto {
  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password12' })
  @IsString()
  password: string;
}

export class LoginResDto extends CreateAccountResDto {
  @ApiProperty({ enum: ActivityLevelEnum, nullable: true })
  activity_level?: ActivityLevelEnum;
  @ApiProperty({ type: Boolean, nullable: true })
  accepting_clients?: boolean;
}
