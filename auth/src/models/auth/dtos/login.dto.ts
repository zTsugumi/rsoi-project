import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AbstractDto } from '../../../common/dtos';

export class LoginDto extends AbstractDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
