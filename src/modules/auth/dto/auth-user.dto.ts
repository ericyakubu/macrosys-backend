import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { GenderEnum, LanguageEnum, UserCredentials } from '@/prisma/client';
import { IsValidPassword, OptionalDate, OptionalString } from '@/shared/decorators';

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

  //
  @OptionalString('Users name', 'Julia', 255, 3)
  name?: string;

  @OptionalString('Users second name (patronymic)', 'Francis', 255, 3)
  second_name?: string;

  @OptionalString('Users last name (family name)', 'Smith', 255, 3)
  lastname?: string;

  @OptionalDate('User birthday', '2000-01-01')
  birthday?: Date;

  @OptionalString('Users phone number', '+380501234567', 15, 10)
  phone?: string;

  @ApiProperty({ enum: GenderEnum, nullable: true, example: GenderEnum.FEMALE })
  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @ApiProperty({ enum: LanguageEnum, nullable: true, example: LanguageEnum.EN })
  @IsEnum(LanguageEnum)
  @IsOptional()
  language?: LanguageEnum;
}
