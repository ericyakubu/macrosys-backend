import { Module } from '@nestjs/common';
import { AdminDietController } from './controllers/admin-diet.controller';
import { TrainerDietController } from './controllers/trainer-diet.controller';
import { DietService } from './diet.service';

@Module({
  controllers: [
    // DietController,
    AdminDietController,
    TrainerDietController,
  ],
  providers: [DietService],
})
export class DietModule {}
