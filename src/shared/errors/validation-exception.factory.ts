import { HttpStatus, type ValidationError } from '@nestjs/common';
import { AppException } from './app.exception';
import { CommonError } from './common.errors';

function flatten(errors: ValidationError[], parent = ''): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const err of errors) {
    const path = parent ? `${parent}.${err.property}` : err.property;
    if (err.constraints) out[path] = Object.keys(err.constraints); // ['isEmail', 'minLength']
    if (err.children?.length) Object.assign(out, flatten(err.children, path));
  }
  return out;
}

export const validationExceptionFactory = (errors: ValidationError[]) =>
  new AppException(CommonError.VALIDATION_FAILED, HttpStatus.BAD_REQUEST, {
    fields: flatten(errors),
  });
