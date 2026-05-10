import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('create')
  async createProduct() {
    return 'got ir';
    // return await this.productService.createUserProduct();
  }
  @Get('get/:id')
  async getProduct() {
    return 'got ir';
    // return await this.productService.getUserProduct();
  }
  @Get('get-all')
  async getAllProduct() {
    return 'got ir';
    // return await this.productService.getAllUserProducts();
  }
  @Patch('update/:id')
  async updateProduct() {
    return 'got ir';
    // return await this.productService.updateUserProduct();
  }

  @Delete('delete/:id')
  async deleteProduct() {
    return 'got ir';
    // return await this.productService.deleteUserProduct();
  }
}
