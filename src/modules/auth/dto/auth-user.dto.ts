import { IsValidPassword } from '@/infrastructure/decorators';
import { UserCredentials } from '@/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserReqDto implements Partial<UserCredentials> {
  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password12' })
  @IsString()
  @IsNotEmpty()
  password?: string;
}

export class SignupUserReqDto implements Partial<UserCredentials> {
  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password12' })
  @IsString()
  @IsNotEmpty()
  @IsValidPassword()
  password: string;
}
