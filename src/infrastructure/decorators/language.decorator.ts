import type { ExtendedRequest, Language as LanguageType } from '@/shared/types';
import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export const Language = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): LanguageType => {
    const request: ExtendedRequest = ctx.switchToHttp().getRequest();
    return request.language;
  },
);
