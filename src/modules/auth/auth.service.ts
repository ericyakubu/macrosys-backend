import { PrismaService } from '@/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  // UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import type { ReturnWithTokens } from '@/shared/types';
import { AccessToken, AuthErrors, BCRYPT_SALT_ROUNDS, RefreshToken } from '@/shared/constants';
import { JwtSecrets } from '@/infrastructure/jwt/jwt.secrets';
import type { LoginAdminReqDto, LoginAdminResDto } from './dto/login-admin.dto';
import type { LoginUserReqDto, LoginUserResDto } from './dto/login-user.dto';
import type { SignupUserReqDto, SignupUserResDto } from './dto/signup-user.dto';
import type { SignupAdminReqDto, SignupAdminResDto } from './dto/signup-admin.dto';
import { Prisma, type Admin, type User } from '@/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(body: LoginUserReqDto): Promise<ReturnWithTokens<LoginUserResDto>> {
    const { email, password } = body;

    const credentials = await this.prisma.userCredentials.findUnique({
      where: {
        email,
      },

      include: {
        user: true,
      },
    });

    if (!credentials) throw new NotFoundException(AuthErrors.userNotFound);

    const isPasswordValid = await bcrypt.compare(password, credentials.password);
    if (!isPasswordValid) throw new BadRequestException(AuthErrors.invalidCredentials);

    const { user } = credentials;

    return this.returnTokens(user);
  }

  async loginAdmin(body: LoginAdminReqDto): Promise<ReturnWithTokens<LoginAdminResDto>> {
    const { login, password } = body;

    const credentials = await this.prisma.adminCredentials.findUnique({
      where: {
        login,
      },

      include: {
        admin: true,
      },
    });

    if (!credentials) throw new NotFoundException(AuthErrors.userNotFound);

    const isPasswordValid = await bcrypt.compare(password, credentials.password);
    if (!isPasswordValid) throw new BadRequestException(AuthErrors.invalidCredentials);

    const { admin } = credentials;

    return this.returnTokens(admin);
  }

  async signupUser(body: SignupUserReqDto): Promise<ReturnWithTokens<SignupUserResDto>> {
    const hashedPassword = await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: body.email,
          credentials: {
            create: {
              email: body.email,
              password: hashedPassword,
            },
          },
        },
      });

      return this.returnTokens(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('User with this email already exists');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async signupAdmin(body: SignupAdminReqDto): Promise<ReturnWithTokens<SignupAdminResDto>> {
    const hashedPassword = await bcrypt.hash(body.password, BCRYPT_SALT_ROUNDS);

    const admin = await this.prisma.admin
      .create({
        data: {
          email: body.email,
          name: body.name,
          lastname: body.lastname,

          credentials: {
            create: {
              login: body.login,
              password: hashedPassword,
            },
          },
        },
      })
      .catch((error) => {
        // if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        //   throw new ConflictException('Admin with this login already exists');
        // }

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
          const target = error.meta?.target;

          console.log(error);

          if (Array.isArray(target)) {
            if (target.includes('email')) {
              throw new ConflictException('Admin with this email already exists');
            }

            if (target.includes('login')) {
              throw new ConflictException('Admin with this login already exists');
            }
          }

          throw new ConflictException('Unique field already exists');
        }
      });

    if (admin) return this.returnTokens(admin);
  }

  private returnTokens<T extends User | Admin>(user: T): ReturnWithTokens<T> {
    const tokenPayload = { id: user.id, role: user.role };
    const accessToken = this.jwtService.sign(tokenPayload, {
      expiresIn: AccessToken.expiresIn,
      secret: JwtSecrets.access,
    });
    const refreshToken = this.jwtService.sign(tokenPayload, {
      expiresIn: RefreshToken.expiresIn,
      secret: JwtSecrets.refresh,
    });
    const transformed = { ...user };

    return { user: transformed, accessToken, refreshToken };
  }
}
