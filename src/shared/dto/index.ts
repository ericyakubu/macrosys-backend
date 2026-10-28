import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min } from 'class-validator';

export * from './auth-tokens.dto';
export * from './user.dto';
export * from './product.dto';
export * from './macros.dto';

export class DietDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
}

export class RangeDto {
  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  min?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  max?: number;
}
