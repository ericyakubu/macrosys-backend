import { ApiProperty } from '@nestjs/swagger';
import { MacrosReqDto } from '.';

export class ProductBaseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  barcode: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  created_at: Date;

  @ApiProperty({ type: Date })
  updated_at: Date;

  @ApiProperty({ type: MacrosReqDto })
  macros: MacrosReqDto;

  @ApiProperty({ type: String })
  photo: string;
}
