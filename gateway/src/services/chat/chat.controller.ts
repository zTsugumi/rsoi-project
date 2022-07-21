import { Request } from 'express';
import { Controller, Get, Param, ParseUUIDPipe, Req } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
    private readonly _chatService: ChatService,
  ) {}

  @Get(':roomUUID')
  public async getChats(
    @Req() request: Request,
    @Param('roomUUID', new ParseUUIDPipe()) roomUUID: string,
  ) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const chats = await this._chatService.getChats(roomUUID);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return chats;
  }
}
