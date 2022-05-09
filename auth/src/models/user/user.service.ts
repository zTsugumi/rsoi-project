import { Injectable } from '@nestjs/common';
import { RegistrationDto } from '../authentication/dtos/registration.dto';
import { AuthEntity } from '../authentication/entities/auth.entity';
import { QueryRunner } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async createUser(
    registrationDto: RegistrationDto,
    auth: AuthEntity,
    queryRunner: QueryRunner,
  ): Promise<UserEntity> {
    const user = this._userRepository.create({
      ...registrationDto,
      auth,
    });

    return queryRunner.manager.save(user);
  }
}
