import { ArgumentsHost, Catch, HttpException, Inject } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AppConfigService } from 'src/config/app/config.service';
import { StatisticService } from 'src/services/statistic/statistic.service';

@Catch(WsException, HttpException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _statisticService: StatisticService,
  ) {
    super();
  }
  catch(exception: WsException | HttpException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient() as Socket;
    // const data = host.switchToWs().getData();
    const error = exception instanceof WsException ? exception.getError() : exception.getResponse();
    const details = error instanceof Object ? { ...error } : { message: error };

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `ws: Error - ${details.message}`,
      atTime: new Date().toISOString(),
    });

    client.emit('error', {
      id: (client as any).id,
      // data: data,
      time: new Date().toISOString(),
      ...details,
    });
  }
}
