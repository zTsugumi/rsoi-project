import { IsEmail, IsNotEmpty, IsString, IsEnum, IsUUID } from 'class-validator';
import Role from '../guard/role.enum';

export class LoginRequestDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginResponseDto {
  @IsUUID()
  @IsNotEmpty()
  readonly uuid: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsEnum(Role)
  @IsNotEmpty()
  readonly role: Role;
}
