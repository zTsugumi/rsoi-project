import { Test, TestingModule } from '@nestjs/testing';
import { StatisticService } from './statistic.service';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/axios';

describe('StatisticService', () => {
  let statisticService: StatisticService;
  let httpService: HttpService;

  class MockHttpService {
    public get<T>() {
      return of({});
    }
    public post<T>() {
      return of({});
    }
  }
  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticService,
        {
          provide: HttpService,
          useClass: MockHttpService,
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
