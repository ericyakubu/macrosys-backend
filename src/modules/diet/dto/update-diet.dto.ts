import { PartialType } from '@nestjs/swagger';
import { CreateDietReqDto } from './create-diet.dto';

export class UpdateDietReqDto extends PartialType(CreateDietReqDto) {}
