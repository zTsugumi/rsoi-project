import { INestApplicationContext, Inject } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { AppConfigService } from 'src/config/app/config.service';

export class SocketIoAdapter extends IoAdapter {
  constructor(
    private readonly app: INestApplicationContext,
    private readonly _appConfig: AppConfigService,
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    // const origins = this._appConfig.corsOrigin.split(',');
    options.cors = {
      origin: this._appConfig.corsOrigin.split(','),
      credentials: true,
    };

    const server = super.createIOServer(port, options);
    return server;
  }
}
