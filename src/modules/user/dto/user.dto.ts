import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsEmail, IsOptional, IsPhoneNumber, IsString, MaxDate } from 'class-validator';
import { GenderEnum, LanguageEnum, User } from '@/prisma/client';
import { ProductBaseDto, UserDto } from '@/shared/dto';

const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 12);

export class UpdateUserReqDto implements Partial<User> {
  @IsOptional()
  @IsDate()
  @MaxDate(minBirthDate, {
    message: 'User must be at least 12 years old',
  })
  @ApiProperty({ type: Date, nullable: true })
  birthday?: Date;

  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiProperty({ enum: GenderEnum, nullable: true })
  @IsString()
  gender?: GenderEnum;

  @IsOptional()
  @ApiProperty({ enum: LanguageEnum, nullable: true })
  @IsString()
  language?: LanguageEnum;

  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  lastname?: string;

  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @ApiProperty({ type: String, nullable: true })
  @IsString()
  second_name?: string;
}

export class UpdateUserResDto extends PartialType(UserDto) {}

export class UserProductDto extends ProductBaseDto {}
