import { Controller, Query, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { RoomService } from './room.service';
import {
  PaginationRequestDto,
  PaginationResponseDto,
} from './dtos/pagination.dto';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';

@Controller('rooms')
export class RoomController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
    private readonly _roomService: RoomService,
  ) {}

  @Get()
  public async getRooms(
    @Req() request: Request,
    @Query() pagination: PaginationRequestDto,
  ): Promise<PaginationResponseDto> {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const rooms = await this._roomService.getRooms(pagination);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return rooms;
  }
}
