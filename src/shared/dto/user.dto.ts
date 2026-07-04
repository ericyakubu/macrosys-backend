import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum, LanguageEnum, RoleEnum, User } from '@/prisma/client';

export class UserDto implements Partial<User> {
  @ApiProperty({ type: String, example: '6d4add2f-329a-4250-bcc6-dda6cbc08956' })
  id: string;

  //
  @ApiProperty({ type: String, nullable: true, example: 'Julia' })
  name?: string;

  @ApiProperty({ type: String, nullable: true, example: 'Francis' })
  second_name?: string;

  @ApiProperty({ type: String, nullable: true, example: 'Smith' })
  lastname?: string;
  //

  @ApiProperty({ type: Date, nullable: true, example: '2000-01-01' })
  birthday?: Date;

  @ApiProperty({ type: String, example: 'juliasmith@domain.com' })
  email: string;

  @ApiProperty({ type: String, nullable: true, example: '+380501234567' })
  phone?: string;

  //
  @ApiProperty({ enum: GenderEnum, nullable: true, example: GenderEnum.FEMALE })
  gender?: GenderEnum;

  @ApiProperty({ enum: LanguageEnum, nullable: true, example: LanguageEnum.EN })
  language: LanguageEnum;

  @ApiProperty({ enum: RoleEnum, example: RoleEnum.USER })
  role: RoleEnum;
}
