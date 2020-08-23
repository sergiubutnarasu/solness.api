import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { GraphQlAuthGuard, GraphQlRolesGuard, Roles } from '@solness/auth';
import { createBaseResolver } from '@solness/core';
import { Role, User, UserInput } from '../objects';
import { UserService } from '../services';

const UserBaseResolver = createBaseResolver<User, UserInput, UserService>(
  'User',
  User,
  UserInput,
);

@UseGuards(GraphQlAuthGuard, GraphQlRolesGuard)
@Roles(Role.Admin)
@Resolver(() => User)
export class UserResolver extends UserBaseResolver {
  constructor(service: UserService) {
    super(service);
  }
}
