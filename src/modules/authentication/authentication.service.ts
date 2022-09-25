import { Injectable } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  public async registerUser(registrationData: RegisterAuthenticationDto) {
    return this.userService.register(registrationData);
  }

  public async loginUser(loginData: LoginAuthenticationDto) {
    const user = await this.userService.getByEmail(loginData.email);
  }
}
