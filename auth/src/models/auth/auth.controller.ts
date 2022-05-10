import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  Res,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller()
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  async register(@Body() registrationData: RegisterDto) {
    return this._authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;

    response.setHeader(
      'Set-Cookie',
      this._authService.getCookieWithJwt(user.id),
    );

    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('signout')
  async logOut(@Res({ passthrough: true }) response: Response) {
    response.setHeader('Set-Cookie', this._authService.getCookieForLogOut());
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
