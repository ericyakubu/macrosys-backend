import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { isString } from 'class-validator';
import { RoleEnum, type LanguageEnum } from '@/prisma/client';
import { PrismaService } from '@/prisma.service';
import { AccessToken, AuthErrors } from '@/shared/constants';
import type { ExtendedRequest, UserFromRequest } from '@/shared/types';
import { JwtSecrets } from '../jwt/jwt.secrets';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private prisma: PrismaService,
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) return false;

    const request: ExtendedRequest = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const acceptableLanguages = request.headers['accept-language'];
    const cookieToken = request.cookies?.[AccessToken.name];

    let userForAuth: UserFromRequest;
    const secret = JwtSecrets.access;

    try {
      if (cookieToken) {
        // Verify instead of just decoding
        console.log('jwt-auth.guard ------------------  getting user from cookies');
        userForAuth = await this.jwtService.verifyAsync(cookieToken, {
          secret,
        });
      } else if (authHeader && authHeader.startsWith('Bearer ')) {
        console.log('jwt-auth.guard ------------------  getting user from header');
        const token = authHeader.split(' ')[1];
        userForAuth = await this.jwtService.verifyAsync(token, {
          secret,
        });
      } else {
        console.log('Invalid or missing authorization token. No bearer token nor cookie found');
        throw new UnauthorizedException(AuthErrors.accessDenied);
      }

      if (!userForAuth?.id || !isString(userForAuth.id) || !userForAuth.role) {
        console.log('Invalid JWT payload');
        throw new UnauthorizedException(AuthErrors.accessDenied);
      }
    } catch {
      console.log('jwt-auth.guard.ts error: error occurred while verifying JWT');
      throw new UnauthorizedException(AuthErrors.accessDenied);
    }

    let user: UserFromRequest | null;

    if (userForAuth.role === RoleEnum.ADMIN) {
      user = await this.prisma.admin.findUnique({
        where: { id: userForAuth.id, disabled: false },
        select: {
          id: true,
          // email: true,
          role: true,
        },
      });
    } else if (userForAuth.role === RoleEnum.USER) {
      user = await this.prisma.user.findUnique({
        where: { id: userForAuth.id, disabled: false },
        select: {
          id: true,
          // email: true,
          role: true,
        },
      });
    } else {
      throw new BadRequestException(AuthErrors.accessDenied);
    }

    const language = (): LanguageEnum => {
      if (!acceptableLanguages) return 'RU';
      const languages = acceptableLanguages.split(',');
      if (languages.includes('RU')) return 'RU';
      else return 'EN';
    };

    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    if (!user) throw new UnauthorizedException(AuthErrors.userNotFound);
    if (roles && !roles.includes(user.role)) throw new ForbiddenException(AuthErrors.accessDenied);

    request.user = user;
    request.language = language();

    return true;
  }
}
