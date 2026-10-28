import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { isString } from 'class-validator';
import { RoleEnum, type LanguageEnum } from '@/prisma/client';
import { PrismaService } from '@/prisma.service';
import { AccessToken } from '@/shared/constants';
import type { AuthUser, ExtendedRequest, JwtPayload } from '@/shared/types';
import { AppException } from '@/shared/errors/app.exception';
import { AuthError } from '@/modules/auth/auth.errors';
import { JwtSecrets } from '../jwt/jwt.secrets';

function assertActive<T extends { disabled: boolean }>(entity: T | null): asserts entity is T {
  if (!entity) throw new AppException(AuthError.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
  if (entity.disabled) throw new AppException(AuthError.PROFILE_DISABLED, HttpStatus.FORBIDDEN);
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ExtendedRequest = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) throw new AppException(AuthError.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);

    const payload = await this.verify(token);
    const user = await this.loadAuthUser(payload);

    const roles = this.reflector.getAllAndOverride<RoleEnum[] | undefined>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles && !roles.includes(user.role)) {
      throw new AppException(AuthError.ACCESS_DENIED, HttpStatus.FORBIDDEN);
    }

    request.user = user;
    request.language = this.detectLanguage(request.headers['accept-language']);
    return true;
  }

  private extractToken(request: ExtendedRequest): string | undefined {
    const cookieToken = request.cookies?.[AccessToken.name];
    if (cookieToken) return cookieToken;

    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    return scheme === 'Bearer' ? token : undefined;
  }

  private async verify(token: string): Promise<JwtPayload> {
    let payload: Partial<JwtPayload>;
    try {
      payload = await this.jwtService.verifyAsync(token, { secret: JwtSecrets.access });
    } catch (error) {
      const expired = error instanceof Error && error.name === 'TokenExpiredError';
      throw new AppException(
        expired ? AuthError.TOKEN_EXPIRED : AuthError.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!isString(payload.id) || !payload.role || !Object.values(RoleEnum).includes(payload.role)) {
      throw new AppException(AuthError.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
    }
    return { id: payload.id, role: payload.role };
  }

  private async loadAuthUser({ id, role }: JwtPayload): Promise<AuthUser> {
    const select = { id: true, disabled: true, role: true } as const;
    let entity: { id: string; disabled: boolean; role: RoleEnum } | null;

    switch (role) {
      case RoleEnum.USER:
        entity = await this.prisma.user.findUnique({ where: { id }, select });
        break;
      case RoleEnum.TRAINER:
        entity = await this.prisma.trainer.findUnique({ where: { id }, select });
        break;
      case RoleEnum.ADMIN:
      case RoleEnum.MODERATOR:
        entity = await this.prisma.admin.findUnique({ where: { id }, select });
        break;
      default:
        throw new AppException(AuthError.TOKEN_INVALID, HttpStatus.UNAUTHORIZED);
    }

    assertActive(entity);
    return { id: entity.id, role: entity.role };
  }

  private detectLanguage(header?: string): LanguageEnum {
    if (!header) return 'RU';
    return header.trim().toLowerCase().startsWith('ru') ? 'RU' : 'EN';
  }
}
