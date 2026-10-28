import { PartialType } from '@nestjs/swagger';
import { CreateDietDto } from './create-diet.dto';

export class UpdateDietDto extends PartialType(CreateDietDto) {}
