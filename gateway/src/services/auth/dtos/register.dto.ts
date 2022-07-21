import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsUUID,
  IsEnum,
  MaxLength,
} from 'class-validator';
import Role from '../guard/role.enum';

export class RegisterRequestDto {
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

export class RegisterResponseDto {
  @IsUUID()
  @IsNotEmpty()
  readonly uuid: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly lastName: string;

  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;
}
