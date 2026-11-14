// guards/guest-only.guard.ts
import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from '@/shared/constants';
import type { ExtendedRequest } from '@/shared/types';
import { AppException } from '@/shared/errors/app.exception';
import { AuthError } from '@/modules/auth/auth.errors';
import { JwtSecrets } from '../jwt/jwt.secrets';

@Injectable()
export class GuestOnlyGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) return true;

    try {
      await this.jwtService.verifyAsync(token, { secret: JwtSecrets.access });
    } catch {
      // expired or garbage token: treat as a guest so stale cookies don't lock people out
      return true;
    }

    throw new AppException(AuthError.ALREADY_AUTHENTICATED, HttpStatus.FORBIDDEN);
  }

  private extractToken(request: ExtendedRequest): string | undefined {
    const cookieToken = request.cookies?.[AccessToken.name];
    if (cookieToken) return cookieToken;

    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    return scheme === 'Bearer' ? token : undefined;
  }
}
