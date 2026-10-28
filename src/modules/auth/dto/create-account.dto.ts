import {
  LanguageEnum,
  Account,
  ActivityLevelEnum,
  GenderEnum,
  RoleEnum,
  Trainer,
  User,
} from '@/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// Common =============================================================================================================
interface CreatedAccount {
  id: string;
  name: string;
  second_name: string;
  lastname: string;
  phone: string;
  birthday: Date;
  gender: GenderEnum;
  language: LanguageEnum;
  role: RoleEnum;
  timezone: string;

  account: {
    email: string;
  };
}

export class CreateAccountResDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String, nullable: true })
  second_name?: string;

  @ApiProperty({ type: String, nullable: true })
  lastname?: string;

  @ApiProperty({ type: String, nullable: true })
  phone?: string;

  @ApiProperty({ type: Date, nullable: true })
  birthday?: Date;

  @ApiProperty({ enum: GenderEnum, nullable: true })
  gender: GenderEnum;

  @ApiProperty({ enum: LanguageEnum })
  language: LanguageEnum;

  @ApiProperty({ type: Number, nullable: true })
  timezone?: string;

  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}

// User ===============================================================================================================

class CreateUserReqDto implements Partial<User> {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  second_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(100)
  lastname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ enum: LanguageEnum })
  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  birthday?: Date;
}

export class CreateUserAccountReqDto extends CreateUserReqDto implements Partial<Account> {
  //

  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password12', minimum: 8, maximum: 72 })
  @IsString()
  @MinLength(8)
  @MaxLength(72) // bcrypt ignores everything past 72 bytes
  password: string;
}

export class CreateUserAccountResDto extends CreateAccountResDto {
  @ApiProperty({ enum: ActivityLevelEnum })
  activity_level: ActivityLevelEnum;
}

export interface CreatedUser extends CreatedAccount {
  activity_level: ActivityLevelEnum;
}

// Trainer ============================================================================================================

class CreateTrainerReqDto implements Partial<Trainer> {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  second_name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(100)
  lastname: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({ enum: LanguageEnum })
  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum;

  @ApiProperty()
  @IsDate()
  birthday: Date;
}

export class CreateTrainerAccountReqDto extends CreateTrainerReqDto implements Partial<Account> {
  //

  @ApiProperty({ example: 'john@example.com' })
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsEmail()
  email: string;

  @ApiProperty({ minLength: 8, maxLength: 72 })
  @IsString()
  @MinLength(8)
  @MaxLength(72) // bcrypt ignores everything past 72 bytes
  password: string;
}

export class CreateTrainerAccountResDto extends CreateAccountResDto {
  @ApiProperty({ type: Boolean })
  accepting_clients: boolean;
}

export interface CreatedTrainer extends CreatedAccount {
  accepting_clients: boolean;
}
