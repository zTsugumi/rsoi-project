import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Connection, QueryRunner } from 'typeorm';
import { CreateAuthDto } from './dtos/create-auth.dto';
import { RegistrationDto } from './dtos/registration.dto';
import { AuthEntity } from './entities/auth.entity';
import { UserAlreadyExistException } from './exceptions/user-already-exist.exception';
import { AuthRepository } from './repositories/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly _authRepository: AuthRepository,
    private readonly _userService: UserService,
    private readonly _connection: Connection,
  ) {}

  async registration(registrationDto: RegistrationDto): Promise<UserEntity> {
    let user: UserEntity;
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const auth = await this._createAuth(registrationDto, queryRunner);

      user = await this._userService.createUser(
        registrationDto,
        auth,
        queryRunner,
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // UniqueViolation
      if (error?.code === '23505') {
        throw new UserAlreadyExistException();
      }

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }

    return user;
  }

  private async _createAuth(
    createAuthDto: CreateAuthDto,
    queryRunner: QueryRunner,
  ): Promise<AuthEntity> {
    const auth = this._authRepository.create(createAuthDto);

    return queryRunner.manager.save(auth);
  }
}
