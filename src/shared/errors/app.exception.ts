import { HttpException, type HttpStatus } from '@nestjs/common';
import type { ErrorCode } from './error-codes';

export class AppException extends HttpException {
  constructor(
    public readonly code: ErrorCode,
    status: HttpStatus,
    public readonly details?: Record<string, unknown>,
  ) {
    super({ code, details }, status);
  }
}
