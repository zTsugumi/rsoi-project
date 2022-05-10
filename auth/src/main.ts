import { NestFactory, Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { APIPrefix } from './common/constant';
import { AppConfigService } from './config/app/config.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
    allowedHeaders: 'Content-Type, Accept',
  });
  app.use(cookieParser());

  const appConfig: AppConfigService = await app.get(AppConfigService);
  const appReflector = app.get(Reflector);

  app.setGlobalPrefix(APIPrefix.version);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(appReflector));

  app.listen(appConfig.port, () => {
    Logger.log(`auth is listening on ${appConfig.port}...`, 'Main');
  });
}
bootstrap();
