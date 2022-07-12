import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseModule } from './database/postgres/postgres.module';
import { StatisticModule } from './models/statistic/statistic.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseModule, StatisticModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
