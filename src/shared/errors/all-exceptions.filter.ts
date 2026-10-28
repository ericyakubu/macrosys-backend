// shared/errors/all-exceptions.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Prisma } from '@/prisma/client';
import { AppException } from './app.exception';
import type { ErrorCode } from './error-codes';
import { CommonError } from './common.errors';

const STATUS_TO_CODE: Partial<Record<number, ErrorCode>> = {
  400: CommonError.BAD_REQUEST,
  401: CommonError.UNAUTHORIZED,
  403: CommonError.FORBIDDEN,
  404: CommonError.NOT_FOUND,
  409: CommonError.CONFLICT,
  429: CommonError.TOO_MANY_REQUESTS,
};
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const { status, code, details } = this.normalize(exception);

    if (status >= 500) {
      this.logger.error(
        `${req.method} ${req.url}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    res.status(status).json({
      statusCode: status,
      code,
      details,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }

  private normalize(e: unknown): {
    status: number;
    code: ErrorCode;
    details?: Record<string, unknown>;
  } {
    if (e instanceof AppException) {
      return { status: e.getStatus(), code: e.code, details: e.details };
    }
    if (e instanceof HttpException) {
      const status = e.getStatus();
      return {
        status,
        code:
          STATUS_TO_CODE[status] ??
          (status >= 500 ? CommonError.INTERNAL : CommonError.BAD_REQUEST),
      };
    }
    // safety net for Prisma errors nobody mapped
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2025') return { status: 404, code: CommonError.NOT_FOUND };
      if (e.code === 'P2002') return { status: 409, code: CommonError.CONFLICT };
    }
    return { status: 500, code: CommonError.INTERNAL };
  }
}
