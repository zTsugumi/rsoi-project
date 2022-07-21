import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticEntity } from './entities/statistic.entity';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
  ) {}

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
      await this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `${request.method}${
          request.url
        }: Service ${service} from ${fromDate ?? null} to ${toDate ?? null}`,
        atTime: new Date(),
      });
    }

    return await this._statisticService.getStatistics(
      service,
      fromDate,
      toDate,
    );
  }

  @Post()
  public async addStatistic(
    @Req() request: Request,
    @Body() statistic: Partial<StatisticEntity>,
  ) {
    await this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Service ${statistic.service}`,
      atTime: new Date(),
    });

    await this._statisticService.addStatistic({ ...statistic });
  }
}
