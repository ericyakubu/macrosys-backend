import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  create() {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne() {
    return `This action returns a #$ product`;
  }

  update() {
    return `This action updates a #$ product`;
  }

  remove() {
    return `This action removes a #$ product`;
  }
}
