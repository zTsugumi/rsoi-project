import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Stats } from './interfaces/stats.interface';
import { firstValueFrom, map, queueScheduler } from 'rxjs';

@Injectable()
export class StatsService {
  private readonly queue = queueScheduler;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  public addStatistic(stat: Partial<Stats>) {
    const task = async () => {
      try {
        await firstValueFrom(this.addStatisticRaw(stat));
      } catch (e) {
        this.queue.schedule(task, 1000);
      }
    };
    this.queue.schedule(task, 1000);
  }

  private addStatisticRaw(stat: Partial<Stats>) {
    const url = this.config.get('URL_STATS') + '/statistics';

    return this.http.post<{}>(url, stat).pipe(map((res) => res.data));
  }
}
