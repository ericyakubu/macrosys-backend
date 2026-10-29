import { ApiProperty } from '@nestjs/swagger';

class DietConflictDto {
  @ApiProperty({ type: String, example: '4820001234567' })
  id: string;

  @ApiProperty({ type: String, example: 'Carnivore' })
  name: string;
}

export class DietDto {
  @ApiProperty({ type: String, example: '4820001234567' })
  id: string;

  @ApiProperty({ type: String, example: 'Carnivore' })
  name: string;

  @ApiProperty({ type: String, nullable: true, example: 'super mega diet' })
  description?: string;

  @ApiProperty({ type: DietConflictDto, isArray: true })
  conflicts: DietConflictDto[];
}
