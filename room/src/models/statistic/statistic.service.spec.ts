import { Test, TestingModule } from '@nestjs/testing';
import { StatisticService } from './statistic.service';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '../../config/app/config.service';

describe('StatisticService', () => {
  let statisticService: StatisticService;
  let httpService: HttpService;

  class HttpServiceMock {
    public get<T>() {
      return of({});
    }
    public post<T>() {
      return of({});
    }
  }
  class AppConfigServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticService,
        {
          provide: HttpService,
          useClass: HttpServiceMock,
        },
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock,
        },
      ],
    }).compile();

    statisticService = moduleRef.get<StatisticService>(StatisticService);
    httpService = moduleRef.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(statisticService).toBeDefined();
  });

  // WIP
});
