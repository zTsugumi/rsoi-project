import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as circuitBreaker from '@bennadel/circuit-breaker';
import { AppConfigService } from '../../config/app/config.service';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class ChatService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  // WIP: log this to statistic service
  private readonly getChatsCB = circuitBreaker.CircuitBreakerFactory.create({
    id: 'get chats',
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

  public async getChats(roomUUID: string) {
    const url = `${this._appConfig.urlChat}/chats/${roomUUID}`;

    return await this.getChatsCB.execute(() => {
      return firstValueFrom(this._httpService.get(url).pipe(map((res) => res.data)));
    });
  }
}
