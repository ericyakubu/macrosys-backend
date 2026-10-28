import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { DietResolverService } from './diet-resolver.service';

@Module({
  controllers: [DietController],
  providers: [DietService, DietResolverService],
})
export class DietModule {}
