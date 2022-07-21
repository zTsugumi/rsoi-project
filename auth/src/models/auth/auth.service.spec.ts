import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtConfigService } from '../../config/jwt/config.service';

describe('AuthService', () => {
  let authService: AuthService;

  class UserServiceMock {}
  class JwtServiceMock {}
  class JwtConfigServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useClass: UserServiceMock,
        },
        {
          provide: JwtService,
          useClass: JwtServiceMock,
        },
        {
          provide: JwtConfigService,
          useClass: JwtConfigServiceMock,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  // Test existence
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  // WIP for other requests
});
