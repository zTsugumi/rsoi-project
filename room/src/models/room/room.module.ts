import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from 'src/config/app/config.module';
import { StatisticModule } from '../statistic/statistic.module';
import { RoomRepository } from './repositories/room.repository';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [
    AppConfigModule,
    StatisticModule,
    TypeOrmModule.forFeature([RoomRepository]),
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
