import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { RegistrationDto } from './dtos/registration.dto';
import { AuthService } from './auth.service';

@Controller('signup')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<UserEntity> {
    return this._authService.registration(registrationDto);
  }
}
