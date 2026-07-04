import { Module } from '@nestjs/common';
import { UserProductController } from './controllers/user-product.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController, UserProductController],
  providers: [ProductService],
})
export class ProductModule {}
