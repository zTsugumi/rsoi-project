import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class RoomInfoDto {
  @IsUUID()
  @IsNotEmpty()
  uuid: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}
