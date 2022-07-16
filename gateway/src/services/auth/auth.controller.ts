import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Body,
  Controller,
  Post,
  Res,
  Get,
  Req,
  ParseArrayPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, catchError, Observable } from 'rxjs';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
    private readonly _httpService: HttpService,
  ) {}

  @Post('signup')
  async register(
    @Req() request: Request,
    @Body() registrationData: RegisterRequestDto,
  ): Promise<Observable<RegisterResponseDto>> {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlAuth + '/signup';
    return this._httpService.post(url, registrationData).pipe(
      map((response) => {
        this._statisticService.addStatistic({
          service: this._appConfig.name,
          description: `${request.method}${request.url}: Succeeded`,
          atTime: new Date().toISOString(),
        });

        return response.data;
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }

  @Post('signin')
  async login(
    @Req() request: Request,
    @Body() loginData: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Observable<LoginResponseDto>> {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlAuth + '/signin';
    return this._httpService.post(url, loginData, { withCredentials: true }).pipe(
      map((res) => {
        this._statisticService.addStatistic({
          service: this._appConfig.name,
          description: `${request.method}${request.url}: Succeeded`,
          atTime: new Date().toISOString(),
        });

        response.setHeader('Set-Cookie', res.headers['set-cookie']);
        return res.data;
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }

  @Get('signout')
  async logout(@Req() request: Request, @Res({ passthrough: true }) response: Response) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlAuth + '/signout';
    return this._httpService
      .get(url, {
        headers: { cookie: request.headers.cookie ?? '' },
      })
      .pipe(
        map((res) => {
          this._statisticService.addStatistic({
            service: this._appConfig.name,
            description: `${request.method}${request.url}: Succeeded`,
            atTime: new Date().toISOString(),
          });

          response.setHeader('Set-Cookie', res.headers['set-cookie']);
          return res.data;
        }),
        catchError((err) => {
          throw new HttpException(err.response.data.message, err.response.data.statusCode);
        }),
      );
  }

  @Get('auth')
  authenticate(@Req() request: Request) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlAuth + '/auth';
    return this._httpService
      .get(url, {
        headers: {
          cookie: request.headers.cookie ?? '',
        },
      })
      .pipe(
        map((res) => {
          this._statisticService.addStatistic({
            service: this._appConfig.name,
            description: `${request.method}${request.url}: Succeeded`,
            atTime: new Date().toISOString(),
          });

          return res.data;
        }),
        catchError((err) => {
          throw new HttpException(err.response.data.message, err.response.data.statusCode);
        }),
      );
  }

  @Get('names')
  public async getNames(
    @Req() request: Request,
    @Body(new ParseArrayPipe({ items: String })) usersUUID: String[],
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlAuth + '/names';
    return this._httpService.get(url, { data: usersUUID }).pipe(
      map((res) => {
        this._statisticService.addStatistic({
          service: this._appConfig.name,
          description: `${request.method}${request.url}: Succeeded`,
          atTime: new Date().toISOString(),
        });

        return res.data;
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }
}
