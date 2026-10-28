import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  HttpStatus,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductReqDto } from './dto/create-product.dto';
import { Auth, User } from '@/shared/decorators';
import { RoleEnum } from '@/prisma/client';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MAX_PHOTO_SIZE } from '@/shared/constants';
import { AppException } from '@/shared/errors/app.exception';
import { ProductError } from './product.errors';
import type { AuthUser } from '@/shared/types';
import { GetProductsResDto } from './dto/get-products.dto';
import { UpdateProductReqDto } from './dto/update-product.dto';
import { ProductDto } from './dto/product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductReqDto })
  @ApiResponse({ type: ProductDto })
  @UseInterceptors(FileInterceptor('photo', { limits: { fileSize: MAX_PHOTO_SIZE } }))
  async create(
    @Body() body: CreateProductReqDto,
    @User() user: AuthUser,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_PHOTO_SIZE }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
        exceptionFactory: () =>
          new AppException(ProductError.INVALID_PHOTO, HttpStatus.BAD_REQUEST),
      }),
    )
    photo?: Express.Multer.File,
  ) {
    return await this.productService.create(body, user, photo);
  }

  @Get()
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiResponse({ type: GetProductsResDto })
  async findAll(@User() user: AuthUser) {
    return await this.productService.findAll(user);
  }

  @Get(':id')
  @Auth(...[RoleEnum.ADMIN, RoleEnum.TRAINER, RoleEnum.USER])
  @ApiResponse({ type: ProductDto })
  @ApiParam({ name: 'id', type: 'string' })
  async findOne(@Param('id') id: string, @User() user: AuthUser) {
    return await this.productService.findOne(user, id);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateProductReqDto })
  @ApiResponse({ type: ProductDto })
  @ApiParam({ name: 'id', type: 'string' })
  async update(@Param('id') id: string, @Body() body: UpdateProductReqDto, @User() user: AuthUser) {
    return await this.productService.update(id, body, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: 'string' })
  async remove(@Param('id') id: string, @User() user: AuthUser) {
    return await this.productService.remove(id, user);
  }
}
