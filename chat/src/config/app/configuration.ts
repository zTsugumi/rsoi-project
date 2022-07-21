import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  host: process.env.APP_HOST,
  port: process.env.PORT,
  httpTimeout: process.env.HTTP_TIMEOUT,
  httpMaxDirect: process.env.HTTP_MAX_REDIRECTS,
  urlGW: process.env.URL_GW,
  urlStat: process.env.URL_STAT,
}));
