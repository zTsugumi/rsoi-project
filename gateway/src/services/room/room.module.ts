import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticModule } from '../statistic/statistic.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    AppConfigModule,
    StatisticModule,
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfigService) => ({
        timeout: appConfig.httpTimeout,
        maxRedirects: appConfig.httpMaxDirect,
      }),
      inject: [AppConfigService],
    }),
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
