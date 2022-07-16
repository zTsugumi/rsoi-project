import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class RoomInfoDto {
  @IsUUID()
  @IsNotEmpty()
  readonly uuid: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly description: string;
}
