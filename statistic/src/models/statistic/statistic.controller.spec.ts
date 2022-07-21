import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';

describe('StatisticController', () => {
  let statisticController: StatisticController;
  let statisticService: StatisticService;

  class AppConfigServiceMock {}
  class StatisticServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [StatisticController],
      providers: [
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock,
        },
        {
          provide: StatisticService,
          useClass: StatisticServiceMock,
        },
      ],
    }).compile();

    statisticController =
      moduleRef.get<StatisticController>(StatisticController);
    statisticService = moduleRef.get<StatisticService>(StatisticService);
  });

  // Test existence
  it('should be defined', () => {
    expect(statisticController).toBeDefined();
  });

  // WIP for other requests
});
