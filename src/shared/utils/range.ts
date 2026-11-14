// import { HttpStatus } from '@nestjs/common';
// import type { RangeDto } from '../dto';
// import { AppException } from '../errors/app.exception';
// import { CommonError } from '../errors/common.errors';

// export function toRange(range?: RangeDto): { gte?: number; lte?: number } | undefined {
//   if (!range || (range.min === undefined && range.max === undefined)) return undefined;

//   if (range.min !== undefined && range.max !== undefined && range.min > range.max) {
//     throw new AppException(CommonError.VALIDATION_FAILED, HttpStatus.BAD_REQUEST, {
//       fields: { range: ['minGreaterThanMax'] },
//     });
//   }
//   return { gte: range.min, lte: range.max };
// }

import { HttpStatus } from '@nestjs/common';
import { AppException } from '../errors/app.exception';
import { CommonError } from '../errors/common.errors';

type RangeQuery<K extends string> = Partial<Record<`${K}_min` | `${K}_max`, number>>;

export function toRange<K extends string>(
  query: RangeQuery<K>,
  field: K,
): { gte?: number; lte?: number } | undefined {
  const q = query as Record<string, number | undefined>;
  const min = q[`${field}_min`];
  const max = q[`${field}_max`];

  if (min === undefined && max === undefined) return undefined;

  if (min !== undefined && max !== undefined && min > max) {
    throw new AppException(CommonError.VALIDATION_FAILED, HttpStatus.BAD_REQUEST, {
      fields: { [field]: ['minGreaterThanMax'] },
    });
  }
  return { gte: min, lte: max };
}
