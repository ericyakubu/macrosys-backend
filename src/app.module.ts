import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GlobalModule } from './global.module';
import { CloudinaryModule } from './infrastructure/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { GoalsModule } from './modules/goals/goals.module';
import { ProductModule } from './modules/product/product.module';
import { RecipeModule } from './modules/recipe/recipe.module';

// import { CloudinaryService } from './infrastructure/cloudinary/cloudinary.service';
// import { CloudinaryProvider } from './infrastructure/cloudinary/cloudinary.provider';
import { DietModule } from './modules/diet/diet.module';
@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CloudinaryModule,
    AuthModule,
    GoalsModule,
    ProductModule,
    RecipeModule,
    DietModule,
  ],
  // providers: [CloudinaryProvider, CloudinaryService],
})
export class AppModule {}
