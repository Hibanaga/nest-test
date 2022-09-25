import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { AuthenticationService } from './authentication.service';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  public async register(@Body() registrationData: RegisterAuthenticationDto) {
    return this.authenticationService.registerUser(registrationData);
  }

  @Post('login')
  public async login(@Body() loginData: LoginAuthenticationDto) {
    return this.authenticationService.loginUser(loginData);
  }
}
