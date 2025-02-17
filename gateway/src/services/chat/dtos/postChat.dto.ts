import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
import ChatType from '../enums/chatType.dto';

export class PostChatReqDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20000)
  readonly content: string;

  @IsUUID()
  @IsNotEmpty()
  readonly roomUUID: string;

  @IsUUID()
  @IsNotEmpty()
  readonly userUUID: string;

  @IsEnum(ChatType)
  @IsNotEmpty()
  readonly type: string;

  @IsDateString()
  @IsNotEmpty()
  readonly atTime: Date;
}
