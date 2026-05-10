import { Module } from '@nestjs/common';
import { DietService } from './diet.service';
import { DietController } from './diet.controller';
import { AdminDietController } from './controllers/admin-diet.controller';
import { TrainerDietController } from './controllers/trainer-diet.controller';

@Module({
  controllers: [DietController, AdminDietController, TrainerDietController],
  providers: [DietService],
})
export class DietModule {}
