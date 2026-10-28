import type { Request } from 'express';
import type { LanguageEnum, RoleEnum } from '@/prisma/client';
import type { AccessToken, RefreshToken } from '@/shared/constants';

export interface JwtPayload {
  id: string;
  role: RoleEnum;
}

export interface AuthUser {
  id: string;
  role: RoleEnum;
}

export interface ExtendedRequest extends Request {
  user?: AuthUser;
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
