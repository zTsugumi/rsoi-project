import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_ENV: Joi.string().valid('development', 'production', 'test', 'provision'),
        APP_NAME: Joi.string().default('gateway'),
        PORT: Joi.number(),
        HTTP_TIMEOUT: Joi.number(),
        HTTP_MAX_REDIRECTS: Joi.number(),
        URL_AUTH: Joi.string(),
        URL_ROOM: Joi.string(),
        URL_CHAT: Joi.string(),
        URL_STAT: Joi.string(),
        CORS_ORIGIN: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
