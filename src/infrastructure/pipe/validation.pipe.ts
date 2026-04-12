import { Injectable } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    // Pass custom options if needed, or use the defaults
    super({
      transform: true, // Automatically transform plain object to DTO instance
      whitelist: true, // Strip properties not in the DTO
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are passed
      transformOptions: { enableImplicitConversion: true }, // Enable implicit conversion for certain types
      // skipMissingProperties: false, // Skip validation for missing properties
    });
  }
}
