import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { APIPrefix } from './common/constant';
import { AppConfigService } from './config/app/config.service';
import { HttpExceptionFilter } from './exception/http-exception.filter';
import { StatisticService } from './models/statistic/statistic.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get(AppConfigService);
  const statisticService: StatisticService = app.get(StatisticService);
  const appReflector = app.get(Reflector);

  app.setGlobalPrefix(APIPrefix.version);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter(statisticService, appConfig));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(appReflector));

  await app.listen(appConfig.port, () => {
    Logger.log(`chat is listening on ${appConfig.port}...`, 'Main');
  });
}
bootstrap();
