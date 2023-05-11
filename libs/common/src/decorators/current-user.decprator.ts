import { ExecutionContext, createParamDecorator } from '@nestjs/common';

const getCurrentUserFromContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

  export const currentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserFromContext(context),
);
