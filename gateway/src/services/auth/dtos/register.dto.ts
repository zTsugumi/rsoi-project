import { IsEmail, IsNotEmpty, IsString, MinLength, IsUUID, IsEnum } from 'class-validator';
import Role from '../guard/role.enum';

export class RegisterRequestDto {
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

export class RegisterResponseDto {
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
