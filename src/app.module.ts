import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global.module';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { DietModule } from './modules/diet/diet.module';
import { MeasurementsModule } from './modules/measurements/measurements.module';
import { ProductModule } from './modules/product/product.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
// import { CloudinaryService } from './infrastructure/cloudinary/cloudinary.service';
// import { CloudinaryProvider } from './infrastructure/cloudinary/cloudinary.provider';

@Module({
  imports: [
    AuthModule,
    DietModule,
    GlobalModule,
    MeasurementsModule,
    ProductModule,
    RecipeModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CloudinaryModule,
  ],
  // providers: [CloudinaryProvider, CloudinaryService],
})
export class AppModule {}
