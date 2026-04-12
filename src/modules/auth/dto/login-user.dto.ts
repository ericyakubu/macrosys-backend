import { UserDto } from '@/infrastructure/dtos/user.dto';
import { UserCredentials } from '@/prisma/client';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserReqDto implements Partial<UserCredentials> {
  @ApiProperty({ type: String, required: true, example: 'juliasmith@domain.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, required: true, example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  password?: string;
}

export class LoginUserResDto extends PartialType(UserDto) {}
