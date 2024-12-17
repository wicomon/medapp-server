import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { AuthResponse, LoginInput, RestorePasswordInput } from './dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { IContextUser } from './interfaces/context-user';
import { ResetPasswordInput } from './dto/inputs/resetPwd.input';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, {name: 'authLogin'})
  login(@Args('loginInput') loginInput: LoginInput){
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse, {name: 'authRestore'})
  restorePassword(@Args('loginInput') restorePasswordInput: RestorePasswordInput){
    return this.authService.restorePassword(restorePasswordInput);
  }

  @Query(() => AuthResponse , {name: 'authRevalidate'})
  @UseGuards( JwtAuthGuard )
  revalidateToken(
    @CurrentUser(/* [ValidRoles.admin] */ ) user: IContextUser
  ){
    // console.log('revaldiatetoken')
    // console.log({user})
    return this.authService.revalidateToken(user);
  }

  @Mutation(() => String, {name: 'authResetPassword'})
  @UseGuards( JwtAuthGuard )
  resetPwd(
    @Args('resetPwdInput') resetPwdInput: ResetPasswordInput,
    @CurrentUser(/* [ValidRoles.admin] */ ) contextUser: IContextUser
  ){
    return this.authService.resetPassword(resetPwdInput, contextUser);
  }

  // @Query(() => AuthResponse, {name: 'authRefreshTokens'})
  @UseGuards(RefreshTokenGuard)
  refreshTokens(){
    return null
  }
}
