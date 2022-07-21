import {
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class ChatResDTO {
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

  @IsString()
  @IsIn(['text', 'file'])
  @IsNotEmpty()
  readonly type: string;

  @IsDateString()
  @IsNotEmpty()
  readonly atTime: Date;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly senderName: string;
}
