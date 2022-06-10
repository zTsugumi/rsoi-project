import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoomInfoDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
