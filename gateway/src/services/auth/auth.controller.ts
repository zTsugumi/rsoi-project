import { HttpService } from '@nestjs/axios';
import { HttpException, Body, Controller, Post, Res, Get, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, catchError, Observable } from 'rxjs';
import { AppConfigService } from '../../config/app/config.service';
import { LoginRequestDto, LoginResponseDto } from './dtos/login.dto';
import { RegisterRequestDto, RegisterResponseDto } from './dtos/register.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  @Post('signup')
  async register(
    @Body() registrationData: RegisterRequestDto,
  ): Promise<Observable<RegisterResponseDto>> {
    const url = this._appConfig.urlAuth + '/signup';

    return this._httpService.post(url, registrationData).pipe(
      map((response) => {
        console.log(response.data);
        return response.data;
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }

  @Post('signin')
  async login(
    @Body() loginData: LoginRequestDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Observable<LoginResponseDto>> {
    const url = this._appConfig.urlAuth + '/signin';

    return this._httpService.post(url, loginData, { withCredentials: true }).pipe(
      map((res) => {
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
    const url = this._appConfig.urlAuth + '/signout';

    return this._httpService
      .get(url, {
        headers: { cookie: request.headers.cookie ?? '' },
      })
      .pipe(
        map((res) => {
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
    const url = this._appConfig.urlAuth + '/auth';

    return this._httpService
      .get(url, {
        headers: {
          cookie: request.headers.cookie ?? '',
        },
      })
      .pipe(
        map((res) => {
          return res.data;
        }),
        catchError((err) => {
          throw new HttpException(err.response.data.message, err.response.data.statusCode);
        }),
      );
  }
}
