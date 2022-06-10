import { NestFactory, Reflector } from '@nestjs/core';
import {
  ValidationPipe,
  Logger,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { APIPrefix } from './common/constant';
import { AppConfigService } from './config/app/config.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig: AppConfigService = await app.get(AppConfigService);
  const appReflector = app.get(Reflector);

  app.setGlobalPrefix(APIPrefix.version);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(appReflector));

  app.listen(appConfig.port, () => {
    Logger.log(`room is listening on ${appConfig.port}...`, 'Main');
  });
}
bootstrap();
