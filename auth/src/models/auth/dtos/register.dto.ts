import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AbstractDto } from '../../../common/dtos';

export class RegisterDto extends AbstractDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
