import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppConfigService } from '../config/app/config.service';
import { StatisticService } from '../models/statistic/statistic.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly _statisticService: StatisticService,
    private readonly _appConfig: AppConfigService,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const msg =
      exception instanceof HttpException
        ? exception.message
        : 'Internal Server Error';

    this._statisticService.addStatistic({
      service: this._appConfig.name,
      description: `${request.method}${request.url}: Error ${status} - ${msg}`,
      atTime: new Date().toISOString(),
    });

    response.status(status).json({
      statusCode: status,
      message: msg,
      time: new Date().toISOString(),
      path: request.url,
    });
  }
}
