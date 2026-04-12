import { ApiProperty } from '@nestjs/swagger';
import {
  GenderEnum,
  LanguageEnum,
  RoleEnum,
  type Admin,
  type AdminCredentials,
} from '@/prisma/client';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from '@/infrastructure/decorators';

export class SignupAdminReqDto implements Partial<AdminCredentials> {
  @ApiProperty({ type: String, required: true, example: 'Julia' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, required: true, example: 'Smith' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ type: String, required: true, example: 'monkey_on_the_bar' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}

export class SignupAdminResDto implements Partial<Admin> {
  @ApiProperty({ type: String })
  id: string;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  phone: string;
  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;
  @ApiProperty({ enum: LanguageEnum })
  language: LanguageEnum;
}
