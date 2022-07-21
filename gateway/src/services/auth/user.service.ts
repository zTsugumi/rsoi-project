import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';
import { AppConfigService } from '../../config/app/config.service';
import * as circuitBreaker from '@bennadel/circuit-breaker';

@Injectable()
export class UserService {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  // WIP: log this to statistic service
  private readonly getNamesCB = circuitBreaker.CircuitBreakerFactory.create({
    id: 'get names',
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

  public async getNames(usersUUID: String[]) {
    const url = this._appConfig.urlAuth + '/names';

    return await this.getNamesCB.execute(() => {
      return firstValueFrom(
        this._httpService.get(url, { data: usersUUID }).pipe(map((res) => res.data)),
      );
    });
  }

  // WIP: log this to statistic service
  private readonly getProfileCB = circuitBreaker.CircuitBreakerFactory.create({
    id: 'get profile',
    requestTimeout: 5000,
    volumeThreshold: 10,
    failureThreshold: 100,
    activeThreshold: 50,
    isFailure: function (error) {
      return error.code in ['ECONNRESET', 'ECONNREFUSED'];
    },
    fallback: {},
    // monitor: function (eventType, eventData) {
    // },
    bucketCount: 40,
    bucketDuration: 100,
  });

  public async getProfile(userUUID: string) {
    const url = `${this._appConfig.urlAuth}/u/${userUUID}`;

    return await this.getProfileCB.execute(() => {
      return firstValueFrom(this._httpService.get(url).pipe(map((res) => res.data)));
    });
  }
}
