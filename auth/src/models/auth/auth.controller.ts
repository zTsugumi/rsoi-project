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
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { RequestWithUser } from './interfaces/requestWithUser.interface';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { StatisticService } from '../statistic/statistic.service';
import { AppConfigService } from '../../config/app/config.service';

@Controller()
export class AuthController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
    private readonly _authService: AuthService,
  ) {}

  @Post('signup')
  async register(
    @Req() request: Request,
    @Body() registrationData: RegisterDto,
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const newUser = await this._authService.register(registrationData);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return newUser;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const { user } = request;
    response.setHeader(
      'Set-Cookie',
      this._authService.getCookieWithJwt(user.id),
    );

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Get('signout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    response.setHeader('Set-Cookie', this._authService.getCookieForLogOut());

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  authenticate(@Req() request: RequestWithUser) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const user = request.user;

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return user;
  }
}
