// We can add custom exceptions here

import { HttpStatus } from '@nestjs/common';
import { ReasonPhrases } from './reason-phrases';
import { BaseRpcException } from '.';

class ConflictException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.CONFLICT,
    statusCode: number = HttpStatus.CONFLICT,
  ) {
    super(message, statusCode);
  }
}

class BadRequestException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.BAD_REQUEST,
    statusCode: number = HttpStatus.BAD_REQUEST,
  ) {
    super(message, statusCode);
  }
}

class NotFoundException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.NOT_FOUND,
    statusCode: number = HttpStatus.NOT_FOUND,
  ) {
    super(message, statusCode);
  }
}

class UnauthorizedException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.UNAUTHORIZED,
    statusCode: number = HttpStatus.UNAUTHORIZED,
  ) {
    super(message, statusCode);
  }
}

class ForbiddenException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.FORBIDDEN,
    statusCode: number = HttpStatus.FORBIDDEN,
  ) {
    super(message, statusCode);
  }
}

class RequestTimeoutException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.REQUEST_TIMEOUT,
    statusCode: number = HttpStatus.REQUEST_TIMEOUT,
  ) {
    super(message, statusCode);
  }
}

class UnprocessableEntityException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.UNPROCESSABLE_ENTITY,
    statusCode: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(message, statusCode);
  }
}

class InternalServerErrorException extends BaseRpcException {
  constructor(
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message, statusCode);
  }
}

export {
  ConflictException,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
  RequestTimeoutException,
  UnprocessableEntityException,
  InternalServerErrorException,
};
