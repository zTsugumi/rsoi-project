import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get env(): string {
    return this.configService.get<string>('app.env');
  }
  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get host(): string {
    return this.configService.get<string>('app.host');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
  get httpTimeout(): number {
    return Number(this.configService.get<number>('app.httpTimeout'));
  }
  get httpMaxDirect(): number {
    return Number(this.configService.get<number>('app.httpMaxDirect'));
  }
  get urlAuth(): string {
    return this.configService.get<string>('app.urlAuth');
  }
  get urlRoom(): string {
    return this.configService.get<string>('app.urlRoom');
  }
  get urlChat(): string {
    return this.configService.get<string>('app.urlChat');
  }
  get urlStat(): string {
    return this.configService.get<string>('app.urlStat');
  }
  get corsOrigin(): string {
    return this.configService.get<string>('app.corsOrigin');
  }
}
