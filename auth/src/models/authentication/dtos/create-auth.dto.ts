import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
