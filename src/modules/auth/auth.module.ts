import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import BaseAuthModule, { AuthService } from '@solness/auth';
import { UserModule, UserService } from '../user';
import { AuthController } from './controllers';

@Module({
  imports: [
    UserModule,
    BaseAuthModule.forRoot(UserService, [UserModule]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
