import { IsDate, IsISO8601, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class StatisticAddDto {
  @IsString()
  @IsNotEmpty()
  readonly service: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  readonly description: string;

  @IsISO8601()
  @IsNotEmpty()
  readonly atTime: string;
}
