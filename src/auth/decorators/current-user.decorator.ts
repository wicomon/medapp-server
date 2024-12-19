import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enum/valid-roles.enum';
import { User } from 'src/user/entities/user.entity';
import { ContextUser } from '../entities/auth.entity';

export const CurrentUser = createParamDecorator(
  async (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;
    const userContext: ContextUser = {
      id: user.id,
      nickName: user.nickName,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
      email: user.email,
      // roles: user.UserProfile.map( usrProfile => usrProfile.SystemProfile.Profile.description || '')
    };
    // console.log('decorator -----------------------------------', userContext);
    if (!user) {
      throw new InternalServerErrorException(`No user inside Request - Guard not implemented`);
    }
    // console.log({userContext})
    // console.log({ValidRoles})
    // console.log({roles})
    if (roles.length === 0) return userContext;
    // for (const role of userContext.roles) {
    //   if (roles.includes(role as ValidRoles)) {
    //     return userContext;
    //   }
    // }

    // throw new ForbiddenException('Sin acceso - Rol no valido');
  },
);
