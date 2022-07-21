import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, from, map, queueScheduler } from 'rxjs';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticAddDto } from './dtos/statistic.dto';
import * as cb from '@bennadel/circuit-breaker';

@Injectable()
export class StatisticService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  private readonly queue = queueScheduler;

  // WIP: log this to statistic service
  private readonly getStatisticsCB = cb.CircuitBreakerFactory.create({
    id: 'get statistics',
    requestTimeout: 5000,
    volumeThreshold: 10,
    failureThreshold: 100,
    activeThreshold: 50,
    isFailure: function (error) {
      return error.code in ['ECONNRESET', 'ECONNREFUSED'];
    },
    fallback: [],
    // monitor: function (eventType, eventData) {
    // },
    bucketCount: 40,
    bucketDuration: 100,
  });

  public getStatistics(service: string, fromDate?: string, toDate?: string) {
    let url = `${this._appConfig.urlStat}/statistics?service=${service}`;

    if (fromDate) {
      url += `&fromDate=${fromDate}`;
    }

    if (toDate) {
      url += `&toDate=${toDate}`;
    }

    return from<StatisticAddDto[][]>(
      this.getStatisticsCB.execute(() => {
        return firstValueFrom(this._httpService.get(url).pipe(map((response) => response.data)));
      }),
    );
  }

  public addStatistic(stat: Partial<StatisticAddDto>) {
    const task = async () => {
      try {
        const url = this._appConfig.urlStat + '/statistics';
        await firstValueFrom(
          this._httpService.post(url, stat).pipe(map((response) => response.data)),
        );
      } catch (err) {
        this.queue.schedule(task, 1000);
      }
    };

    this.queue.schedule(task, 1000);
  }
}
