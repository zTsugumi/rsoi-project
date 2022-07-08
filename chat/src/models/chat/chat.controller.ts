import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResDTO } from './dtos/chatRes.dto';
import { PostChatReqDTO } from './dtos/postChat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly _chatService: ChatService) {}

  @Get(':roomUUID')
  public async getChats(
    @Param('roomUUID', new ParseUUIDPipe()) roomUUID: string,
  ): Promise<ChatResDTO[]> {
    return await this._chatService.getChats(roomUUID);
  }

  @Post()
  public async postChat(@Body() chatMsg: PostChatReqDTO): Promise<ChatResDTO> {
    return await this._chatService.postChat(chatMsg);
  }
}
