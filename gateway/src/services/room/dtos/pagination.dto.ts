import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min, Max, IsNotEmpty, IsArray } from 'class-validator';
import { RoomInfoDto } from './room.dto';

export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  pageSize: number;
}

export class PaginationResponseDto {
  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  pageSize: number;

  @IsNumber()
  @IsNotEmpty()
  totalElements: number;

  @IsArray()
  items: RoomInfoDto[];
}
