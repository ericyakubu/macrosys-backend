import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDietReqDto {
  @ApiProperty({ type: String, example: 'Carnivore', required: true, minLength: 2, maxLength: 64 })
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  name: string;

  @ApiProperty({
    type: String,
    example: 'super mega diet',
    required: false,
    minLength: 8,
    maxLength: 512,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(512)
  description?: string;

  @ApiPropertyOptional({
    type: [String],
    format: 'uuid',
    description: 'IDs of diets that cannot be combined with this one (symmetric)',
  })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) =>
    value === undefined ? undefined : Array.isArray(value) ? value : [value],
  )
  @ArrayUnique()
  @IsUUID('all', { each: true })
  conflicts_with?: string[];
}
