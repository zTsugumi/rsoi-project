import { AbstractDto } from '../../../common/dtos';

export class CreateUserDto extends AbstractDto {
  readonly firstName: string;

  readonly lastName: string;

  readonly email: string;

  readonly password: string;
}
