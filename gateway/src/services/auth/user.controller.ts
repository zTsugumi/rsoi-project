import { Controller, Get, Param, ParseArrayPipe, ParseUUIDPipe } from '@nestjs/common';
import { Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
    private readonly _userService: UserService,
  ) {}

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

    const names = this._userService.getNames(usersUUID);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return names;
  }

  @Get('u/:userUUID')
  public async getProfile(
    @Req() request: Request,
    @Param('userUUID', new ParseUUIDPipe()) userUUID: string,
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const profile = this._userService.getProfile(userUUID);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return profile;
  }
}
