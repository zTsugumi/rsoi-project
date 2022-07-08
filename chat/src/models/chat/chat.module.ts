import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ChatRepository } from './repositories/chat.repository';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/config.service';

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
    TypeOrmModule.forFeature([ChatRepository]),
  ],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
