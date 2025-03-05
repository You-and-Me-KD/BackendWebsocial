import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'apps/users/src/users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  console.log('CurrentUser', context.switchToHttp().getRequest().user);
  return context.switchToHttp().getRequest().user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
