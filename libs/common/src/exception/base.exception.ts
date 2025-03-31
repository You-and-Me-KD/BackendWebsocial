import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from './reason-phrases';
import { RpcException } from '@nestjs/microservices';

export class BaseHttpException extends HttpException {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly errorCode?: string,
  ) {
    super(message, statusCode);
  }
}

export class BaseRpcException extends RpcException {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly errorCode?: string,
  ) {
    super({ message, statusCode, errorCode });
  }
}
