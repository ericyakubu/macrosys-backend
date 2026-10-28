import { HttpStatus } from '@nestjs/common';
import type { RangeDto } from '../dto';
import { AppException } from '../errors/app.exception';
import { CommonError } from '../errors/common.errors';

export function toRange(range?: RangeDto): { gte?: number; lte?: number } | undefined {
  if (!range || (range.min === undefined && range.max === undefined)) return undefined;

  if (range.min !== undefined && range.max !== undefined && range.min > range.max) {
    throw new AppException(CommonError.VALIDATION_FAILED, HttpStatus.BAD_REQUEST, {
      fields: { range: ['minGreaterThanMax'] },
    });
  }
  return { gte: range.min, lte: range.max };
}
