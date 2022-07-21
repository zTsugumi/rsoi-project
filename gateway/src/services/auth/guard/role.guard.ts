import Role from './role.enum';
import { CanActivate, ExecutionContext, HttpException, Inject, mixin, Type } from '@nestjs/common';
import { Request } from 'express';
import { Socket } from 'socket.io';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from 'src/config/app/config.service';
import { firstValueFrom } from 'rxjs';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    constructor(
      @Inject(AppConfigService) private readonly _appConfig: AppConfigService,
      @Inject(HttpService) private readonly _httpService: HttpService,
    ) {}

    async canActivate(context: ExecutionContext) {
      let cookie = null;

      switch (context.getType()) {
        case 'http': {
          const request = context.switchToHttp().getRequest<Request>();
          cookie = request?.headers?.cookie ?? null;
          break;
        }
        case 'ws': {
          const client = context.switchToWs().getClient<Socket>();
          cookie = client?.handshake?.headers?.cookie ?? null;
          break;
        }
        default: {
          break;
        }
      }

      const url = this._appConfig.urlAuth + '/auth';

      const user = await firstValueFrom(this._httpService.get(url, { headers: { cookie: cookie } }))
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          throw new HttpException(err.response.data.message, err.response.data.statusCode);
        });

      return user?.role.includes(role);
    }
  }

  return mixin(RoleGuardMixin);
};
export default RoleGuard;
