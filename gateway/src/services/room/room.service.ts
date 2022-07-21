import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as circuitBreaker from '@bennadel/circuit-breaker';
import { AppConfigService } from '../../config/app/config.service';
import { PaginationRequestDto } from './dtos/pagination.dto';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class RoomService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  // WIP: log this to statistic service
  private readonly getRoomsCB = circuitBreaker.CircuitBreakerFactory.create({
    id: 'get rooms',
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

  public async getRooms(pagination: PaginationRequestDto) {
    const url = this._appConfig.urlRoom + '/rooms';

    return await this.getRoomsCB.execute(() => {
      return firstValueFrom(
        this._httpService.get(url, { params: pagination }).pipe(map((res) => res.data)),
      );
    });
  }
}
