import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppConfigModule } from './config/app/config.module';
import { AppConfigService } from './config/app/config.service';

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
  controllers: [],
  providers: [],
})
export class AppModule {}
