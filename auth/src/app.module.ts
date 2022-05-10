import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseModule } from './database/postgres/postgres.module';
import { AuthModule } from './models/auth/auth.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [AppConfigModule, PostgresDatabaseModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
