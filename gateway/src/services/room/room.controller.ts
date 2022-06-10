import { HttpService } from '@nestjs/axios';
import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { map, catchError, Observable } from 'rxjs';
import { AppConfigService } from 'src/config/app/config.service';
import { PaginationRequestDto, PaginationResponseDto } from './dtos/pagination.dto';

@Controller()
export class RoomController {
  constructor(
    private readonly _appConfig: AppConfigService,
    private readonly _httpService: HttpService,
  ) {}

  @Get('rooms')
  public getRooms(@Query() pagination: PaginationRequestDto): Observable<PaginationResponseDto> {
    const url = this._appConfig.urlRoom + '/rooms';

    return this._httpService.get(url, { params: pagination }).pipe(
      map((response) => response.data),
      catchError((err) => {
        throw new HttpException(err.response.data.message, err.response.data.statusCode);
      }),
    );
  }
}
