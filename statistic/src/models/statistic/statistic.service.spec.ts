import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatisticService } from './statistic.service';
import { StatisticRepository } from './repositories/statistic.repository';

describe('StatisticService', () => {
  let statisticService: StatisticService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticService,
        {
          provide: getRepositoryToken(StatisticRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    statisticService = moduleRef.get<StatisticService>(StatisticService);
  });

  // Test existence
  it('should be defined', () => {
    expect(statisticService).toBeDefined();
  });

  // WIP for other requests
});
