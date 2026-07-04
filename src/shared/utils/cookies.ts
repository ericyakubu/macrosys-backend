import type { Response } from 'express';
import type { Cookie } from '@/shared/types';

interface SetCookie {
  cookie: Cookie;
  value: any;
  res: Response;
}

interface ClearCookie {
  name: string;
  res: Response;
}

export class Cookies {
  static setCookie = ({ cookie, value, res }: SetCookie) =>
    res.cookie(cookie.name, value, {
      httpOnly: true,
      secure: true, // Set to true in production (requires HTTPS)
      sameSite: 'strict', // Prevents CSRF, set to 'strict'
      maxAge: cookie.ttl,
      path: '/',
    });

  static setCookies = (cookies: SetCookie[]) => {
    for (const cookie of cookies) {
      this.setCookie(cookie);
    }
  };

  static removeCookie = ({ name, res }: ClearCookie) => {
    res.clearCookie(name, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  };

  static removeCookies = (cookies: ClearCookie[]) => {
    for (const cookie of cookies) {
      this.removeCookie(cookie);
    }
  };
}
