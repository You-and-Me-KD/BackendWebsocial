import { RpcException } from '@nestjs/microservices';
import { BadRequestException } from './custom.exception';

export function handleServiceException(
  error: unknown,
  DefaultExceptionClass = BadRequestException,
): never {
  if (error instanceof RpcException) {
    throw error; // Re-throw RpcException directly
  }

  throw new DefaultExceptionClass(error as string);
}
