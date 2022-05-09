import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { AuthRepository } from './repositories/auth.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([AuthRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthenticationModule {}
