import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app/config.module';
import { PostgresDatabaseModule } from './database/postgres/postgres.module';
import { AuthenticationModule } from './models/authentication/auth.module';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresDatabaseModule,
    UserModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
