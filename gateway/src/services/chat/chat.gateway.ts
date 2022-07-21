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
import { StatisticService } from '../statistic/statistic.service';

@WebSocketGateway()
@UsePipes(new ValidationPipe({ transform: true }))
@UseFilters(WebsocketExceptionsFilter)
export class ChatGateway {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
    private readonly _statisticService: StatisticService,
  ) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage('msg-to-server')
  @UseGuards(RoleGuard(Role.user))
  async handleSendMessage(@MessageBody() msg: PostChatReqDTO) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `ws://msg-to-server: Pending`,
      atTime: new Date().toISOString(),
    });

    const url = this._appConfig.urlChat + '/chats';
    return this._httpService.post(url, msg).pipe(
      map((response) => {
        this._statisticService.addStatistic({
          service: this._appConfig.name,
          description: `ws://msg-to-server: Succeeded`,
          atTime: new Date().toISOString(),
        });

        this.wss.to(msg.roomUUID).emit('msg-to-client', response.data);
      }),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() room: RoomDTO) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `ws://join-room: Pending`,
      atTime: new Date().toISOString(),
    });

    try {
      client.join(room.roomUUID);

      this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `ws://join-room: Succeeded`,
        atTime: new Date().toISOString(),
      });

      return 'joined-room';
    } catch (err) {
      return err;
    }
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() room: RoomDTO) {
    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `ws://leave-room: Pending`,
      atTime: new Date().toISOString(),
    });

    try {
      client.leave(room.roomUUID);

      this._statisticService.addStatistic({
        service: this._appConfig.name,
        description: `ws://leave-room: Succeeded`,
        atTime: new Date().toISOString(),
      });

      return 'left-room';
    } catch (err) {
      return err;
    }
  }
}
