import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/app/config.module';
import { StatisticRepository } from './repositories/statistic.repository';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([StatisticRepository])],
  controllers: [StatisticController],
  providers: [StatisticService],
})
export class StatisticModule {}
