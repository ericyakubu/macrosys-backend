import { Controller, Post, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiAcceptedResponse } from '@nestjs/swagger';
import { type Response } from 'express';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { Authenticated } from '@/shared/decorators';
import { Cookies } from '@/shared/utils';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  @Authenticated()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiAcceptedResponse({
    description: 'Clears cookies (no longer able to access any endpoint)',
  })
  logout(@Res() res: Response) {
    Cookies.removeCookies([
      { name: AccessToken.name, res },
      { name: RefreshToken.name, res },
    ]);

    return res.send({ message: 'Logged out successfully' });
  }

  // @Post('refresh-tokens')
  // @Authenticated()
  // @HttpCode(HttpStatus.ACCEPTED)
  // @ApiOkResponse({
  //   description: 'Auth cookies were updated',
  // })
  // async refresh(@Req() req: ExtendedRequest, @Res() res: Response) {
  //   const refresh = req.cookies[RefreshToken.name];
  //   if (!refresh) throw new UnauthorizedException(AuthErrors.accessDenied);

  //   const { accessToken, refreshToken } = await this.authService.refresh(refresh);

  //   Cookies.setCookies([
  //     { cookie: AccessToken, value: accessToken, res },
  //     { cookie: RefreshToken, value: refreshToken, res },
  //   ]);

  //   return res.send({ message: "Tokens've been refreshed" });
  // }
}
