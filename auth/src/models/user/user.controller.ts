import { Body, Controller, Get, ParseArrayPipe, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppConfigService } from 'src/config/app/config.service';
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

    const names = await this._userService.getNames(usersUUID);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return names;
  }
}
