import { Injectable } from '@nestjs/common';
import {
  CreateTrainerAccountReqDto,
  CreateUserAccountReqDto,
  CreateTrainerAccountResDto,
  CreateUserAccountResDto,
  type CreatedUser,
  type CreatedTrainer,
} from './dto/create-account.dto';
import { PrismaService } from '@/prisma.service';
import { JwtService } from '@nestjs/jwt';
import type { AuthUser, ReturnWithTokens } from '@/shared/types';
import { AccessToken, BCRYPT_SALT_ROUNDS, RefreshToken } from '@/shared/constants';
import { JwtSecrets } from '@/shared/jwt/jwt.secrets';
import bcrypt from 'bcrypt';
import { Prisma } from '@/prisma/client';
import { AuthError } from './auth.errors';
import { HttpStatus } from '@nestjs/common';
import { AppException } from '@/shared/errors/app.exception';
import { uniqueFields } from '@/shared/prisma/unique-fields';
import type { LoginReqDto, LoginResDto } from './dto/login.dto';
import { TRAINER_SELECT, USER_SELECT } from './auth.selects';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(
    body: CreateUserAccountReqDto,
  ): Promise<ReturnWithTokens<CreateUserAccountResDto>> {
    const { email, password, ...profile } = body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...profile,
          account: { create: { email, password: hash } },
        },
        select: {
          ...USER_SELECT,
          account: { select: { email: true } },
        },
      });

      return this.returnTokens({ ...user, email: user.account.email });
    } catch (error) {
      throw this.mapCreateError(error);
    }
  }

  async createTrainer(
    body: CreateTrainerAccountReqDto,
  ): Promise<ReturnWithTokens<CreateTrainerAccountResDto>> {
    const { email, password, ...profile } = body;
    const hash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);

    try {
      const trainer = await this.prisma.trainer.create({
        data: {
          ...profile,
          account: { create: { email, password: hash } },
        },
        select: {
          ...TRAINER_SELECT,
          account: { select: { email: true } },
        },
      });

      return this.returnTokens({ ...trainer, email });
    } catch (error) {
      throw this.mapCreateError(error);
    }
  }

  async loginUser(body: LoginReqDto): Promise<ReturnWithTokens<LoginResDto>> {
    const account = await this.prisma.account.findUnique({
      where: { email: body.email },
      select: {
        email: true,
        password: true,
        user: { select: { ...USER_SELECT, disabled: true } },
      },
    });

    if (!account || !(await bcrypt.compare(body.password, account.password))) {
      throw new AppException(AuthError.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (!account.user) {
      throw new AppException(AuthError.PROFILE_MISSING, HttpStatus.FORBIDDEN);
    }
    const { disabled, ...user } = account.user;

    if (disabled) {
      throw new AppException(AuthError.PROFILE_DISABLED, HttpStatus.FORBIDDEN);
    }
    return this.returnTokens({ ...user, account: { email: account.email } });
  }

  async loginTrainer(body: LoginReqDto): Promise<ReturnWithTokens<LoginResDto>> {
    const account = await this.prisma.account.findUnique({
      where: { email: body.email },
      select: {
        email: true,
        password: true,
        trainer: { select: { ...TRAINER_SELECT, disabled: true } },
      },
    });

    if (!account || !(await bcrypt.compare(body.password, account.password))) {
      throw new AppException(AuthError.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
    }
    if (!account.trainer) {
      throw new AppException(AuthError.PROFILE_MISSING, HttpStatus.FORBIDDEN);
    }
    const { disabled, ...trainer } = account.trainer;

    if (disabled) {
      throw new AppException(AuthError.PROFILE_DISABLED, HttpStatus.FORBIDDEN);
    }
    return this.returnTokens({ ...trainer, account: { email: account.email } });
  }

  async updateTokens(user: AuthUser): Promise<{ accessToken: string; refreshToken: string }> {
    const role = user.role;

    const exists = await this.prisma[role].findUnique({ where: { id: user.id } });

    if (!exists) throw new AppException(AuthError.PROFILE_MISSING, HttpStatus.FORBIDDEN);

    const tokenPayload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: AccessToken.expiresIn,
      secret: JwtSecrets.access,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: RefreshToken.expiresIn,
      secret: JwtSecrets.refresh,
    });
    return { accessToken, refreshToken };
  }

  private returnTokens<T extends CreatedTrainer | CreatedUser>(
    user: T,
  ): ReturnWithTokens<Omit<T, 'account'> & { email: string }> {
    const { account, ...profile } = user;

    const tokenPayload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: AccessToken.expiresIn,
      secret: JwtSecrets.access,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: RefreshToken.expiresIn,
      secret: JwtSecrets.refresh,
    });

    return { user: { ...profile, email: account.email }, accessToken, refreshToken };
  }

  private mapCreateError(error: unknown): unknown {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      const fields = uniqueFields(error).join(',');
      if (fields.includes('phone')) {
        return new AppException(AuthError.PHONE_TAKEN, HttpStatus.CONFLICT);
      }
      if (fields.includes('email')) {
        return new AppException(AuthError.EMAIL_TAKEN, HttpStatus.CONFLICT);
      }
    }
    return error; // unknown errors go to the filter: logged, answered as INTERNAL_ERROR
  }
}
