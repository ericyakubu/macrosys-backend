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
  @OptionalString({ description: 'Users name', example: 'Julia', maxLength: 255, minLength: 3 })
  name?: string;

  @OptionalString({
    description: 'Users second name (patronymic)',
    example: 'Francis',
    maxLength: 255,
    minLength: 3,
  })
  second_name?: string;

  @OptionalString({
    description: 'Users last name (family name)',
    example: 'Smith',
    maxLength: 255,
    minLength: 3,
  })
  lastname?: string;

  @OptionalDate({ description: 'User birthday', example: '2000-01-01' })
  birthday?: Date;

  @OptionalString({
    description: 'Users phone number',
    example: '+380501234567',
    maxLength: 15,
    minLength: 10,
  })
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
