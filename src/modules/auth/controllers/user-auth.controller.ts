import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { type Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Cookies } from '@/shared/utils';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { LoginUserReqDto, SignupUserReqDto } from '../dto/auth-user.dto';
import { UserDto } from '@/infrastructure/dto';

@Controller('user/auth')
export class UserAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/user')
  @ApiOkResponse({ type: UserDto })
  @ApiBody({ type: LoginUserReqDto })
  @HttpCode(HttpStatus.OK)
  async loginUser(@Body() body: LoginUserReqDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.loginUser(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }

  @Post('signup/user')
  @ApiOkResponse({ type: UserDto })
  @ApiBody({ type: SignupUserReqDto })
  @HttpCode(HttpStatus.OK)
  async signupUser(@Body() body: SignupUserReqDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.signupUser(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    return res.send(user);
  }
}
