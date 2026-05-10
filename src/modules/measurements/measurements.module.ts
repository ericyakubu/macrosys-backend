import { Module } from '@nestjs/common';
import { MeasurementsService } from './measurements.service';
import { MeasurementsController } from './measurements.controller';
import { CloudinaryService } from '@/infrastructure/cloudinary/cloudinary.service';
import { CloudinaryProvider } from '@/infrastructure/cloudinary/cloudinary.provider';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService, CloudinaryService, CloudinaryProvider],
})
export class MeasurementsModule {}
