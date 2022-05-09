import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthDto } from '../../authentication/dtos/create-auth.dto';

export class CreateUserDto extends CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;
}
