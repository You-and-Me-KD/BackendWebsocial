import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDomain } from 'apps/users/src/users';

const getCurrentUserByContext = (context: ExecutionContext): UserDomain => {
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
