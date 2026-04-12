import type { Request } from 'express';
// import { AccessToken, RefreshToken } from '../common/constants';
import type { Language } from '.';
import type { RoleEnum } from '@/prisma/client';
import type { AccessToken, RefreshToken } from '@/shared/constants';

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
  language: Language;
  cookies: {
    [AccessToken.name]?: string;
    [RefreshToken.name]?: string;
  };
}
