import { BadRequestException, Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import Role from '../auth/guard/role.enum';
import RoleGuard from '../auth/guard/role.guard';
import { StatisticService } from './statistic.service';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Controller('statistics')
export class StatisticController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
  ) {}
  @UseGuards(RoleGuard(Role.admin))
  @Get()
  public async getStatistics(
    @Req() request: Request,
    @Query('service') service: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    if (!service) {
      throw new BadRequestException('Service name needed');
    } else {
      this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `${request.method}${request.url}: Service ${service} from ${
          fromDate ?? null
        } to ${toDate ?? null}`,
        atTime: new Date().toISOString(),
      });
    }

    return await firstValueFrom(this._statisticService.getStatistics(service, fromDate, toDate));
  }
}
