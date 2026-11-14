import type { Type as ClassType } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

type RangeKeys<K extends string> = `${K}_min` | `${K}_max`;

export function RangeQueryMixin<K extends string>(
  ...fields: K[]
): ClassType<Partial<Record<RangeKeys<K>, number>>> {
  class RangeQueryClass {}

  for (const field of fields) {
    for (const suffix of ['min', 'max'] as const) {
      const key = `${field}_${suffix}`;
      const target = RangeQueryClass.prototype;

      ApiPropertyOptional({ type: Number })(target, key); // no `minimum`, so docs don't prefill 0
      IsOptional()(target, key);
      Type(() => Number)(target, key);
      IsNumber()(target, key);
      Min(0)(target, key);
    }
  }

  return RangeQueryClass as ClassType<Partial<Record<RangeKeys<K>, number>>>;
}
