import { IsNotEmpty, IsUUID } from 'class-validator';

export class RoomDTO {
  @IsUUID()
  @IsNotEmpty()
  readonly roomUUID: string;
}
