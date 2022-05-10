import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../../user/user.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { JwtConfigService } from '../../../config/jwt/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _jwtConfigService: JwtConfigService,
    private readonly _userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      secretOrKey: _jwtConfigService.secret,
    });
  }

  async validate(payload: TokenPayload) {
    return this._userService.getById(payload.userId);
  }
}
