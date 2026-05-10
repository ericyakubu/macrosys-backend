import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from '../product.service';
import { CreateProductReqDto, ProductDto } from '../dto/create-product.dto';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { User, UserOnly } from '@/infrastructure/decorators';
import type { UserFromRequest } from '@/shared/types';

@Controller('user-product')
export class UserProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiBody({ type: CreateProductReqDto })
  @UserOnly()
  @ApiOkResponse({ type: ProductDto })
  async createProduct(@Body() body: CreateProductReqDto, @User() user: UserFromRequest) {
    return await this.productService.createUserProduct(body, user);
  }
  @Get('get/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getUserProduct(id);
  }
  // @Get('get-all')
  // async getAllProduct() {
  //   return await this.productService.getAllUserProducts();
  // }
  // @Patch('update/:id')
  // async updateProduct() {
  //   return await this.productService.updateUserProduct();
  // }

  // @Delete('delete/:id')
  // async deleteProduct() {
  //   return await this.productService.deleteUserProduct();
  // }
}
