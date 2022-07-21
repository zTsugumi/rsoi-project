import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly _userRepository: UserRepository) {}

  public async createUser(userData: CreateUserDto): Promise<UserEntity> {
    const newUser = this._userRepository.create(userData);

    await this._userRepository.save(newUser);

    return newUser;
  }

  public async getByEmail(email: string) {
    const user = await this._userRepository.findOne({ email });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getById(id: number) {
    const user = await this._userRepository.findOne({ id });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getByUUID(userUUID: string) {
    const user = await this._userRepository.findOne({
      where: { uuid: userUUID },
    });

    if (user) {
      return user;
    }

    throw new HttpException(
      'User with this uuid does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  public async getNames(usersUUID: String[]) {
    const users = await this._userRepository.find({
      where: { uuid: In(usersUUID) },
    });

    const fullNames = {};
    for (const user of users) {
      fullNames[user.uuid] = user.firstName + ' ' + user.lastName;
    }

    return fullNames;
  }
}
