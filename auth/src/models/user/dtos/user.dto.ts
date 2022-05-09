import { AuthDto } from '../../authentication/dtos/auth.dto';
import { AbstractDto } from 'src/common/dtos';

export class UserDto extends AbstractDto {
  readonly firstName: string;

  readonly lastName: string;

  readonly auth: AuthDto;
}
