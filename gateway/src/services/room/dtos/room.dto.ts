import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class RoomInfoDto {
  @IsUUID()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
