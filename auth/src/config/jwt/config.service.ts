import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  get expirationTime(): string {
    return this.configService.get<string>('jwt.expirationTime');
  }
}
