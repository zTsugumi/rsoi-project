import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  class AppConfigServiceMock {}
  class StatisticServiceMock {}
  class UserServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useClass: UserServiceMock,
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

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  // Test existence
  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  // WIP for other requests
});
