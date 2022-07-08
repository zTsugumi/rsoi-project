import { HttpService } from '@nestjs/axios';
import { HttpException, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  MessageBody,
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { catchError, map } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { WebsocketExceptionsFilter } from '../../exception/ws-exception.filter';
import { AppConfigService } from '../../config/app/config.service';
import Role from '../auth/guard/role.enum';
import RoleGuard from '../auth/guard/role.guard';
import { PostChatReqDTO } from './dtos/postChat.dto';
import { RoomDTO } from './dtos/joinRoom.dto';

@WebSocketGateway()
@UsePipes(new ValidationPipe())
@UseFilters(new WebsocketExceptionsFilter())
export class ChatGateway {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage('msg-to-server')
  @UseGuards(RoleGuard(Role.User))
  async handleSendMessage(@MessageBody() msg: PostChatReqDTO) {
    const url = this._appConfig.urlChat + '/chats';

    return this._httpService.post(url, msg).pipe(
      map((response) => {
        this.wss.to(msg.roomUUID).emit('msg-to-client', response.data);
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: RoomDTO) {
    try {
      client.join(room.roomUUID);
      return 'joined-room';
    } catch (err) {
      return err;
    }
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: RoomDTO) {
    try {
      client.leave(room.roomUUID);
      return 'left-room';
    } catch (err) {
      return err;
    }
  }
}
