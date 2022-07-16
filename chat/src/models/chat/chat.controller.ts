import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticService } from '../statistic/statistic.service';
import { ChatService } from './chat.service';
import { ChatResDTO } from './dtos/chatRes.dto';
import { PostChatReqDTO } from './dtos/postChat.dto';

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
  ): Promise<ChatResDTO[]> {
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

  @Post()
  public async postChat(
    @Req() request: Request,
    @Body() chatMsg: PostChatReqDTO,
  ): Promise<ChatResDTO> {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Pending`,
      atTime: new Date().toISOString(),
    });

    const newChat = await this._chatService.postChat(chatMsg);

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Succeeded`,
      atTime: new Date().toISOString(),
    });

    return newChat;
  }
}
