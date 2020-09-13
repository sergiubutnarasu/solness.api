import { Controller } from '@nestjs/common';
import {
  AuthController as BaseAuthController,
  AuthService,
} from '@solness/auth';

@Controller('auth')
export class AuthController extends BaseAuthController {
  constructor(authenticationService: AuthService) {
    super(authenticationService);
  }
}
