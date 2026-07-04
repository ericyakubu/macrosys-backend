import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { LanguageEnum } from '@/prisma/client';
import type { ExtendedRequest } from '@/shared/types';

export const Language = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LanguageEnum => {
    const request: ExtendedRequest = ctx.switchToHttp().getRequest();
    return request.language;
  },
);
