import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserProductController } from './controllers/user-product.controller';

@Module({
  controllers: [ProductController, UserProductController],
  providers: [ProductService],
})
export class ProductModule {}
