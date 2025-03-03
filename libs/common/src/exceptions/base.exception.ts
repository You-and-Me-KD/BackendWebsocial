import { HttpException, HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from './reason-phrases';

export class BaseException extends HttpException {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly errorCode?: string,
  ) {
    super(message, statusCode);
  }
}
