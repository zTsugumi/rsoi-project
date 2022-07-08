import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';
import { Controller, Get, HttpException, Param, ParseUUIDPipe } from '@nestjs/common';
import { AppConfigService } from 'src/config/app/config.service';

@Controller('chats')
export class ChatController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  @Get(':roomUUID')
  public async getChats(@Param('roomUUID', new ParseUUIDPipe()) roomUUID: string) {
    const url = `${this._appConfig.urlChat}/chats/${roomUUID}`;

    return this._httpService.get(url, { params: { roomUUID: roomUUID } }).pipe(
      map((response) => response.data),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }
}
