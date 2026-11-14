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
import { Transform, Type } from 'class-transformer';
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
  last_name: string;
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
  last_name?: string;

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
  @ApiProperty({ type: String, required: true, example: 'Julia' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ type: String, required: false, example: 'Ann' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  second_name?: string;

  @ApiPropertyOptional({ type: String, required: false, example: 'Smith' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  last_name?: string;

  @ApiPropertyOptional({ type: String, required: false, example: '+16474647997' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ enum: LanguageEnum })
  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
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
  last_name: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @ApiPropertyOptional({ enum: LanguageEnum })
  @IsOptional()
  @IsEnum(LanguageEnum)
  language?: LanguageEnum;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
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
