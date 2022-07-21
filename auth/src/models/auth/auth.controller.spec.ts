import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('UserController', () => {
  let authController: AuthController;
  let authService: AuthService;

  class AppConfigServiceMock {}
  class StatisticServiceMock {}
  class AuthServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
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

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  // Test existence
  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  // WIP for other requests
});
