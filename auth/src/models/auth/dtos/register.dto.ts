import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AbstractDto } from '../../../common/dtos';

export class RegisterDto extends AbstractDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly lastName: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(100)
  readonly password: string;
}
