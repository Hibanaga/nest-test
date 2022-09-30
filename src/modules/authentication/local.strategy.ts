import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from './authentication.service';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { IAuthSuccessResponse } from '../../types/AuthGlobal.types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthenticationService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<IAuthSuccessResponse> {
    const user = await this.authenticationService.validateUser({
      email,
      password,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
