import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IContextUser } from 'src/auth/interfaces/context-user';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Resolver(() => User)
// @UseGuards(JwtAuthGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}

  @Query(() => [User], { name: 'userFindAll' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'userFindById' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => Boolean, { name: 'userCreate' })
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
    // @CurrentUser(/* [ValidRoles.admin] */) user: IContextUser,
  ) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => Boolean, { name: 'userUpdate' })
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean, { name: 'userDelete' })
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
