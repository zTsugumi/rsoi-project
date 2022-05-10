import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StatsService } from './stats.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
