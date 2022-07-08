import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseModule } from './database/postgres/postgres.module';
import { ChatModule } from './models/chat/chat.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
