import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, catchError, lastValueFrom } from 'rxjs';
import { ChatRepository } from './repositories/chat.repository';
import { AppConfigService } from '../../config/app/config.service';
import { PostChatReqDTO } from './dtos/postChat.dto';
import { ChatResDTO } from './dtos/chatRes.dto';
import { ChatEntity } from './entities/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    private readonly _httpService: HttpService,
    private readonly _appConfig: AppConfigService,
    private readonly _chatRepository: ChatRepository,
  ) {}

  public async getChats(roomUUID: string): Promise<ChatResDTO[]> {
    const chatMsgs = await this._chatRepository.find({
      where: { roomUUID: roomUUID },
      order: { createdAt: 'ASC' },
    });

    // Get usernames for every msg
    const urlAuth = this._appConfig.urlGW + '/names';
    const usersUUID = [...new Set(chatMsgs.map((msg) => msg.userUUID))];
    const fullNames = await lastValueFrom(
      this._httpService.get(urlAuth, { data: usersUUID }).pipe(
        map((response) => response.data),
        catchError((err) => {
          throw new HttpException(
            err.response.data.message,
            err.response.data.statusCode,
          );
        }),
      ),
    );

    // Add full name to every msg
    return chatMsgs.map((msg) => this._buildChatResDTO(msg, fullNames));
  }

  public async postChat(chatMsg: PostChatReqDTO) {
    let newChatMsg = await this._chatRepository.save(
      this._chatRepository.create(chatMsg),
    );

    // Get usernames for every msg
    const urlAuth = this._appConfig.urlGW + '/names';
    const usersUUID = [chatMsg.userUUID];
    const fullNames = await lastValueFrom(
      this._httpService.get(urlAuth, { data: usersUUID }).pipe(
        map((response) => response.data),
        catchError((err) => {
          throw new HttpException(
            err.response.data.message,
            err.response.data.statusCode,
          );
        }),
      ),
    );

    // Add full name to every msg
    return this._buildChatResDTO(newChatMsg, fullNames);
  }

  private _buildChatResDTO(msg: ChatEntity, fullNames: String[]): ChatResDTO {
    return <ChatResDTO>{
      roomUUID: msg.roomUUID,
      userUUID: msg.userUUID,
      type: msg.type,
      content: msg.content,
      senderName: fullNames[msg.userUUID],
      atTime: msg.atTime,
    };
  }
}
