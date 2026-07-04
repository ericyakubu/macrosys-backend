import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { type Response } from 'express';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { AdminDto } from '@/shared/dto/admin.dto';
import { Cookies } from '@/shared/utils';
import { AuthService } from '../auth.service';
import { LoginAdminReqDto, SignupAdminReqDto } from '../dto/auth-admin.dto';

@ApiTags('Auth - Admin')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginAdminReqDto })
  @ApiOkResponse({ type: AdminDto })
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

  @Post('signup')
  @ApiOkResponse({ type: AdminDto })
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
