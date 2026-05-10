import { Injectable } from '@nestjs/common';
import type { CreateProductReqDto, ProductDto } from './dto/create-product.dto';
import { PrismaService } from '@/prisma.service';
import type { UserFromRequest } from '@/shared/types';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}
  async getUserProduct(id: string): Promise<ProductDto> {
    const product = await this.prismaService.userProduct.findUnique({
      where: { id },
      select: {
        id: true,
        barcode: true,
        name: true,
        description: true,
        rating: true,
        photo: true,
        calories: true,
        carbohydrates: true,
        fat: true,
        fiber: true,
        protein: true,
        sugar: true,
        created_at: true,
        diet: true,
      },
    });

    return product;
  }
  // async getAllUserProducts() {
  //   return 'This action adds a new product';
  // }
  async createUserProduct(body: CreateProductReqDto, user: UserFromRequest): Promise<ProductDto> {
    return this.prismaService.userProduct.create({
      data: { ...body, user: { connect: { id: user.id } } },
      include: { diet: true, photo: true },
    });
  }
  // async updateUserProduct() {
  //   return 'This action adds a new product';
  // }
  // async deleteUserProduct() {
  //   return 'This action adds a new product';
  // }

  // //

  // async createProduct() {
  //   return 'This action adds a new product';
  // }
}
