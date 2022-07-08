import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/app/config.service';
import { APIPrefix } from './common/constant';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { SocketIoAdapter } from './socket/socketio.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get(AppConfigService);

  app.enableCors({
    origin: appConfig.corsOrigin.split(','),
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });

  app.setGlobalPrefix(APIPrefix.version);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useWebSocketAdapter(new SocketIoAdapter(app, appConfig));

  await app.listen(appConfig.port, () => {
    Logger.log(`gateway is listening on ${appConfig.port}...`, 'Main');
  });
}
bootstrap();
