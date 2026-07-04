import type { Request } from 'express';
import type { LanguageEnum, RoleEnum } from '@/prisma/client';
import type { AccessToken, RefreshToken } from '@/shared/constants';

// import { AccessToken, RefreshToken } from '../common/constants';

export interface UserFromRequest {
  id: string;
  role: RoleEnum;
}

export interface ExtendedRequest extends Request {
  user?: UserFromRequest;
  headers: {
    authorization?: string;
    'accept-language'?: string;
  };
  language: LanguageEnum;
  cookies: {
    [AccessToken.name]?: string;
    [RefreshToken.name]?: string;
  };
}
