import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserAccountReqDto,
  CreateTrainerAccountReqDto,
  CreateTrainerAccountResDto,
  CreateUserAccountResDto,
} from './dto/create-account.dto';
import type { Response } from 'express';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { Cookies } from '@/shared/utils';
import { LoginReqDto, LoginResDto } from './dto/login.dto';
import { Authenticated, Unauthenticated, User } from '@/shared/decorators';
import type { AuthUser } from '@/shared/types';

// TODO: needs proper ApiOperation description
// TODO: missing tying logic so that trainer can "create his own user account"

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @Unauthenticated()
  @ApiBody({ type: CreateUserAccountReqDto })
  @ApiResponse({ type: CreateUserAccountResDto })
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user using email and password and returns user information. Access and refresh tokens are set as HTTP-only cookies.',
  })
  async createUser(@Body() body: CreateUserAccountReqDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.createUser(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }

  @Post('trainer')
  @Unauthenticated()
  @ApiBody({ type: CreateTrainerAccountReqDto })
  @ApiResponse({ type: CreateTrainerAccountResDto })
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user using email and password and returns user information. Access and refresh tokens are set as HTTP-only cookies.',
  })
  async createTrainer(@Body() body: CreateTrainerAccountReqDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.createTrainer(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }

  @Post('user/login')
  @Unauthenticated()
  @ApiBody({ type: LoginReqDto })
  @ApiResponse({ type: LoginResDto })
  @ApiOperation({})
  async loginUser(@Body() body: LoginReqDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.loginUser(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }

  @Post('trainer/login')
  @Unauthenticated()
  @ApiBody({ type: LoginReqDto })
  @ApiResponse({ type: LoginResDto })
  @ApiOperation({})
  async loginTrainer(@Body() body: LoginReqDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.loginTrainer(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }

  @Post('logout')
  @Authenticated()
  @ApiOperation({})
  async logout(@Res() res: Response) {
    Cookies.removeCookies([
      { name: AccessToken.name, res },
      { name: RefreshToken.name, res },
    ]);

    return res.send({ message: 'Logged out successfully' });
  }

  @Post('update-tokens')
  @Authenticated()
  @ApiOperation({})
  async updateTokens(@User() user: AuthUser, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.updateTokens(user);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }
}
