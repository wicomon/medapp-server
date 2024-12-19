import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

export class JwtAuthGuard extends AuthGuard('jwt'){

  //! Override
  getRequest(context: ExecutionContext) {
    // console.log(context)
    const ctx = GqlExecutionContext.create( context );
    const request = ctx.getContext().req;
    // console.log('jwt-guard-----------------------------------')
    // console.log(request.headers)
    // console.log('guard')
    return request
  }

  handleRequest(err: Error | null, user: any, info: Error | null, context: ExecutionContext) {
    if (err || !user) {
      // console.error('Token extraction error:', err || info.message);
      throw err || new UnauthorizedException(info.message);
    }
    return user;
  }
}