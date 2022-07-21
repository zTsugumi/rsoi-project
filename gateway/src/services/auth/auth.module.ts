import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/config.service';
import { StatisticModule } from '../statistic/statistic.module';
import { AuthController } from './auth.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  controllers: [AuthController, UserController],
  providers: [UserService],
})
export class AuthModule {}
