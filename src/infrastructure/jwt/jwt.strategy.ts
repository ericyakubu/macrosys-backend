import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtSecrets } from './jwt.secrets';
import { AccessToken } from '@/shared/constants';

interface JwtPayload {
  id: string; // user id
  // email: string;
  role?: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secretOrKey = JwtSecrets.access;
    if (!secretOrKey) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // Check the Authorization header (Bearer token)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Check the cookie (Fastify request)
        (request: Request): string | null => {
          return (request?.cookies?.[AccessToken.name] as string) ?? null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey,
    });
  }

  validate(payload: JwtPayload) {
    return payload;
  }
}
