import { ApiProperty, PartialType } from '@nestjs/swagger';
import { type UserCredentials } from '@/prisma/client';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsValidPassword } from '@/infrastructure/decorators';
import { UserDto } from '@/infrastructure/dtos/user.dto';

export class SignupUserReqDto implements Partial<UserCredentials> {
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

export class SignupUserResDto extends PartialType(UserDto) {}
// export class SignupUserResDto implements Partial<User> {
//   @ApiProperty({ type: String })
//   id: string;

//   @ApiProperty({ type: String, nullable: true })
//   name: string | null;

//   @ApiProperty({ type: String })
//   email: string;

//   @ApiProperty({ type: String, nullable: true })
//   phone: string | null;

//   @ApiProperty({ type: Date, nullable: true })
//   birthday: Date | null;

//   @ApiProperty({ enum: RoleEnum })
//   role: RoleEnum;

//   @ApiProperty({ enum: GenderEnum, nullable: true })
//   gender: GenderEnum | null;

//   @ApiProperty({ enum: LanguageEnum })
//   language: LanguageEnum;
// }
