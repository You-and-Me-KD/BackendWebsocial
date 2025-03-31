import {
  ExceptionFilter as NestExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';

@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  private readonly logger = new Logger(ExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: any = 'Internal server error';
    let exceptionName = 'Unknown';
    console.log(
      exception,
      exception instanceof HttpException,
      exception instanceof RpcException,
      exception instanceof Error,
      typeof exception,
      '00000',
    );
    try {
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        message = exception.getResponse();
        exceptionName = exception.name;
      } else if (exception instanceof RpcException) {
        const error = exception.getError();
        status =
          error && typeof error === 'object' && 'statusCode' in error
            ? (error as any).statusCode
            : HttpStatus.INTERNAL_SERVER_ERROR;
        message = error;
        exceptionName = exception.name;
      } else if (exception instanceof Error) {
        message = exception.message;
        exceptionName = exception.name;
      }

      if (typeof message === 'object' && message !== null) {
        status = message?.statusCode || status;
        message = message?.message || message?.error || JSON.stringify(message);
      }
    } catch (err) {
      this.logger.error(`Error processing exception: ${err}`);
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
      exceptionName = 'ExceptionProcessingError';
    }

    response.status(status).json({
      meta: {
        code: status,
        message: message,
        exception: exceptionName,
        path: request.url,
      },
      data: null,
    });
  }
}
