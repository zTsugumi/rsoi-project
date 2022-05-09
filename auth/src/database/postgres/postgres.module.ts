import { DatabaseType } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConfigModule } from '../../config/database/postgres/config.module';
import { PostgresConfigService } from '../../config/database/postgres/config.service';
import { AppConfigModule } from '../../config/app/config.module';
import { AppConfigService } from '../../config/app/config.service';
import { AuthSubscriber } from '../../models/authentication/subscribers/auth.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule, AppConfigModule],
      inject: [PostgresConfigService, AppConfigService],
      useFactory: async (
        postgresConfigService: PostgresConfigService,
        appConfigService: AppConfigService,
      ) => ({
        type: 'postgres' as DatabaseType,
        url: postgresConfigService.url,
        // schema: 'loyalties',
        entities: ['dist/models/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        subscribers: [AuthSubscriber],
        ssl:
          appConfigService.env === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    } as TypeOrmModuleAsyncOptions),
  ],
})
export class PostgresDatabaseModule {}
