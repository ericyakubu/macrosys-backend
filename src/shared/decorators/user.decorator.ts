import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { ExtendedRequest, AuthUser } from '@/shared/types';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): AuthUser => {
  const request: ExtendedRequest = ctx.switchToHttp().getRequest();
  return request.user;
});
