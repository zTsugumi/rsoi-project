import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomService } from './room.service';
import { RoomRepository } from './repositories/room.repository';

describe('RoomService', () => {
  let roomService: RoomService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(RoomRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    roomService = moduleRef.get<RoomService>(RoomService);
  });

  // Test existence
  it('should be defined', () => {
    expect(roomService).toBeDefined();
  });

  // WIP for other requests
});
