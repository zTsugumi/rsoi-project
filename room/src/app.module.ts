import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseModule } from './database/postgres/postgres.module';
import { RoomModule } from './models/room/room.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseModule, RoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
