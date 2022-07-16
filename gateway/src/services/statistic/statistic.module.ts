import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigService } from '../../config/app/config.service';
import { AppConfigModule } from '../../config/app/config.module';
import { StatisticService } from './statistic.service';
import { StatisticController } from './statistic.controller';

@Module({
  imports: [
    AppConfigModule,
    HttpModule.registerAsync({
      imports: [AppConfigModule],
      useFactory: async (appConfig: AppConfigService) => ({
        timeout: appConfig.httpTimeout,
        maxRedirects: appConfig.httpMaxDirect,
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [StatisticController],
  providers: [StatisticService],
  exports: [StatisticService]
})
export class StatisticModule {}
