import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

describe('ChatController', () => {
  let chatController: ChatController;
  let chatService: ChatService;

  class AppConfigServiceMock {}
  class StatisticServiceMock {}
  class ChatServiceMock {}

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ChatController],
      providers: [
        {
          provide: ChatService,
          useClass: ChatServiceMock,
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

    chatController = moduleRef.get<ChatController>(ChatController);
    chatService = moduleRef.get<ChatService>(ChatService);
  });

  // Test existence
  it('should be defined', () => {
    expect(chatController).toBeDefined();
  });

  // WIP for other requests
});
