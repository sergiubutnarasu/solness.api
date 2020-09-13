import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories';
import { UserResolver } from './resolvers';
import { UserService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UserService, UserResolver],
  exports: [UserService, TypeOrmModule.forFeature([UserRepository])],
})
export class UserModule {}
