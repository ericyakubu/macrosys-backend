import { ApiProperty } from '@nestjs/swagger';
import { Admin, GenderEnum, LanguageEnum, RoleEnum } from '@/prisma/client';

export class AdminDto implements Partial<Admin> {
  @ApiProperty({ type: String, example: '6d4add2f-329a-4250-bcc6-dda6cbc08956' })
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

  @ApiProperty({ enum: GenderEnum })
  gender: GenderEnum;

  @ApiProperty({ enum: LanguageEnum })
  language: LanguageEnum;
}
