import { Module } from '@nestjs/common';
import BaseAuthModule from '@solness/auth';
import { UserModule, UserService } from '../user';

@Module({
  imports: [UserModule, BaseAuthModule.forRoot(UserService)],
})
export class AuthModule {}
