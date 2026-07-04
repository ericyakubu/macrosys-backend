import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { type AdminCredentials } from '@/prisma/client';
import { IsValidPassword } from '@/shared/decorators';

export class LoginAdminReqDto implements Partial<AdminCredentials> {
  @ApiProperty({ type: String, required: true, example: 'monkey_on_the_bar' })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({ type: String, required: true, example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

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
