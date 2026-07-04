import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string) {
    super({ message, code: 'CUSTOM_ERROR' }, HttpStatus.BAD_REQUEST);
  }
}
