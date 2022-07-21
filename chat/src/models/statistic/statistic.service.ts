import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, queueScheduler } from 'rxjs';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticAddDto } from './dtos/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  private readonly queue = queueScheduler;

  public addStatistic(stat: Partial<StatisticAddDto>) {
    const task = async () => {
      try {
        const url = this._appConfig.urlStat + '/statistics';
        await firstValueFrom(
          this._httpService
            .post(url, stat)
            .pipe(map((response) => response.data)),
        );
      } catch (err) {
        this.queue.schedule(task, 1000);
      }
    };

    this.queue.schedule(task, 1000);
  }
}
