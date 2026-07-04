import { Controller, Post, Body, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { type Response } from 'express';
import { AccessToken, RefreshToken } from '@/shared/constants';
import { UserDto } from '@/shared/dto';
import { Cookies } from '@/shared/utils';
import { AuthService } from '../auth.service';
import { LoginUserReqDto, SignupUserReqDto } from '../dto/auth-user.dto';

@ApiTags('Auth - User')
@Controller('auth/user')
export class UserAuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: UserDto })
  @ApiOperation({
    summary: 'User login',
    description:
      'Authenticates a user using email and password and returns user information. Access and refresh tokens are set as HTTP-only cookies.',
  })
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

  @Post('signup')
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
