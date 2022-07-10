import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from 'src/users/interfaces/user.interface';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): CurrentUser => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
