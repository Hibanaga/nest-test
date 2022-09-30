import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { AuthenticationService } from './authentication.service';
import { LoginAuthenticationDto } from './dto/login-authentication.dto';
import { LocalAuthGuard } from './local-authentication.guard';
import { ApiProperty } from '@nestjs/swagger';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('register')
  public async register(@Body() registrationData: RegisterAuthenticationDto) {
    return this.authenticationService.registerUser(registrationData);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  public async login(@Body() loginData: LoginAuthenticationDto) {
    return { status: 200, email: loginData.email };
  }
}
