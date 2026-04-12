import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { type Response } from 'express';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Cookies } from '@/shared/utils';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { LoginAdminResDto, LoginAdminReqDto } from '../dto/login-admin.dto';
import { SignupAdminReqDto, SignupAdminResDto } from '../dto/signup-admin.dto';

@Controller('auth')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @ApiBody({ type: LoginAdminReqDto })
  @ApiOkResponse({ type: LoginAdminResDto })
  @HttpCode(HttpStatus.OK)
  async loginAdmin(@Body() body: LoginAdminReqDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.loginAdmin(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    console.log('set cookies');
    return res.send(user);
  }

  @Post('signup/admin')
  @ApiOkResponse({ type: SignupAdminResDto })
  @ApiBody({ type: SignupAdminReqDto })
  @HttpCode(HttpStatus.OK)
  async signupAdmin(@Body() body: SignupAdminReqDto, @Res() res: Response) {
    const { user, accessToken, refreshToken } = await this.authService.signupAdmin(body);

    Cookies.setCookies([
      { cookie: AccessToken, value: accessToken, res },
      { cookie: RefreshToken, value: refreshToken, res },
    ]);

    console.log('set cookies');
    return res.send(user);
  }
}
