import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({ type: String })
  accessToken: string;
  @ApiProperty({ type: String })
  refreshToken: string;
}
