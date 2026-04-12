import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { DietModule } from './modules/diet/diet.module';
import { ConfigModule } from '@nestjs/config';
import { MeasurementsModule } from './modules/measurements/measurements.module';

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
  ],
})
export class AppModule {}
