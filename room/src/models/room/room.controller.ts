import { Controller, Query, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from './dtos/pagination.dto';

@Controller()
export class RoomController {
  constructor(private _roomService: RoomService) {}

  @Get('rooms')
  public async getRooms(
    @Query() pagination: PaginationRequestDto,
  ): Promise<PaginationResponseDto> {
    return await this._roomService.getRooms(pagination);
  }
}
