import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import * as path from 'path';
import { AppConfigService } from 'src/config/app/config.service';
import { StatisticEntity } from './entities/statistic.entity';
import { StatisticService } from './statistic.service';

@Controller('statistics')
export class StatisticController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
  ) {}

  curPath = path.relative(process.cwd(), __filename);

  @Get()
  public async getStatistics(
    @Query('service') service: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
  ) {
    if (!service) {
      this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `${this.curPath} - Error 400: service name not provided`,
        atTime: new Date(),
      });
      throw new BadRequestException();
    } else {
      await this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `Get stat of service ${service} from ${
          fromDate ?? null
        } to ${toDate ?? null}`,
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
  public async addStatistic(@Body() statistic: Partial<StatisticEntity>) {
    await this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `Add stat of service ${statistic.service}`,
      atTime: new Date(),
    });

    await this._statisticService.addStatistic({ ...statistic });
  }
}
