import { Module } from '@nestjs/common';
import { CloudinaryProvider } from '@/infrastructure/cloudinary/cloudinary.provider';
import { CloudinaryService } from '@/infrastructure/cloudinary/cloudinary.service';
import { MeasurementsController } from './measurements.controller';
import { MeasurementsService } from './measurements.service';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService, CloudinaryService, CloudinaryProvider],
})
export class MeasurementsModule {}
