import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

describe('RoomController', () => {
  let roomController: RoomController;
  let roomService: RoomService;

  class AppConfigServiceMock {}
  class StatisticServiceMock {}
  class RoomServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        {
          provide: RoomService,
          useClass: RoomServiceMock,
        },
        {
          provide: StatisticService,
          useClass: StatisticServiceMock,
        },
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock,
        },
      ],
    }).compile();

    roomController = moduleRef.get<RoomController>(RoomController);
    roomService = moduleRef.get<RoomService>(RoomService);
  });

  // Test existence
  it('should be defined', () => {
    expect(roomController).toBeDefined();
  });

  // WIP for other requests
});
