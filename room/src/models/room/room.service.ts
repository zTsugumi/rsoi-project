import { Injectable } from '@nestjs/common';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from './dtos/pagination.dto';
import { RoomRepository } from './repositories/room.repository';
import { RoomEntity } from './entities/room.entity';
import { RoomInfoDto } from './dtos/room.dto';

@Injectable()
export class RoomService {
  constructor(private readonly _roomRepository: RoomRepository) {}

  public async getRooms(
    pagination: PaginationRequestDto,
  ): Promise<PaginationResponseDto> {
    const { page, pageSize } = pagination;

    const [rooms, count] = await this._roomRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return this._buildPaginationResponse(page, pageSize, count, rooms);
  }

  private _buildRoomResponse(room: RoomEntity): RoomInfoDto {
    const roomInfoDto = new RoomInfoDto();
    roomInfoDto.uuid = room.uuid;
    roomInfoDto.name = room.name;
    roomInfoDto.description = room.description;

    return roomInfoDto;
  }

  private _buildPaginationResponse(
    page: number,
    pageSize: number,
    count: number,
    rooms: RoomEntity[],
  ): PaginationResponseDto {
    const paginationResponseDto = new PaginationResponseDto();
    paginationResponseDto.page = Number(page);
    paginationResponseDto.pageSize = Number(pageSize);
    paginationResponseDto.totalElements = count;
    paginationResponseDto.items = rooms.map((room: RoomEntity) =>
      this._buildRoomResponse(room),
    );

    return paginationResponseDto;
  }
}
