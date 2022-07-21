import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { AppConfigService } from '../../config/app/config.service';
import { ChatService } from './chat.service';
import { ChatRepository } from './repositories/chat.repository';

describe('ChatService', () => {
  let chatService: ChatService;

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
        ChatService,
        {
          provide: HttpService,
          useClass: HttpServiceMock,
        },
        {
          provide: AppConfigService,
          useClass: AppConfigServiceMock,
        },
        {
          provide: getRepositoryToken(ChatRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    chatService = moduleRef.get<ChatService>(ChatService);
  });

  // Test existence
  it('should be defined', () => {
    expect(chatService).toBeDefined();
  });

  // WIP for other requests
});
