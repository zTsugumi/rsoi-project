import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dtos/register.dto';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
    private readonly _jwtConfigService: JwtConfigService,
  ) {}

  public async register(registerData: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    try {
      const newUser = await this._userService.createUser({
        ...registerData,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      // UniqueViolation
      if (error?.code === '23505') {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this._userService.getByEmail(email);
      await this._verifyPassword(plainTextPassword, user.password);
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwt(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this._jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this._jwtConfigService.expirationTime}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  private async _verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
