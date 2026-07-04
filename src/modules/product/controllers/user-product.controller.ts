import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiExtraModels, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User, UserOnly } from '@/shared/decorators';
import type { UserFromRequest } from '@/shared/types';
import { GetAllProductsDto } from '../dto/get-product.dto';
import { CreateProductReqDto, ProductDto, UpdateProductReqDto } from '../dto/product.dto';
import { ProductService } from '../product.service';

@ApiTags('Product - User')
@Controller('user/product')
export class UserProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Create product',
    description:
      'No tricks here, just create a product. If you want to add a diet - pass diets arrays with each diet id',
  })
  @ApiBody({ type: CreateProductReqDto })
  @UserOnly()
  @ApiOkResponse({ type: ProductDto })
  async createProduct(@Body() body: CreateProductReqDto, @User() user: UserFromRequest) {
    return await this.productService.createUserProduct(body, user);
  }

  @Get('get/:id')
  @UserOnly()
  @ApiOkResponse({ type: ProductDto })
  async getProduct(@Param('id') id: string, @User() user: UserFromRequest) {
    return await this.productService.getUserProduct(id, user);
  }

  @Get('get-all')
  @ApiExtraModels(GetAllProductsDto)
  @UserOnly()
  @ApiOkResponse({ type: [ProductDto] })
  async getAllProducts(@User() user: UserFromRequest, @Query() queries: GetAllProductsDto) {
    return await this.productService.getAllUserProducts(queries, user);
  }

  @Patch('update/:id')
  @ApiBody({ type: UpdateProductReqDto })
  @UserOnly()
  @ApiOkResponse({ type: ProductDto })
  async updateProduct(
    @Param('id') id: string,
    @Body() body: UpdateProductReqDto,
    @User() user: UserFromRequest,
  ) {
    return await this.productService.updateUserProduct(id, body, user);
  }
}
