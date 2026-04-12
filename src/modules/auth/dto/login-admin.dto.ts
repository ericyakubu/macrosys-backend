import { RoleEnum, type Admin, type AdminCredentials } from '@/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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

export class LoginAdminResDto implements Partial<Admin> {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String, example: 'Julia' })
  name: string;

  @ApiProperty({ type: String, nullable: true, example: 'Smith' })
  lastname: string | null;

  @ApiProperty({
    type: String,
    nullable: true,
    example: 'juliasmith@domain.com',
  })
  email: string | null;

  @ApiProperty({ type: String, nullable: true, example: '+380501234567' })
  phone: string | null;

  @ApiProperty({ enum: RoleEnum, type: String, example: RoleEnum.ADMIN })
  role: RoleEnum;
}
