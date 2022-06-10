import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomRepository } from './repositories/room.repository';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomRepository])],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
