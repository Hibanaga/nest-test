import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
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
    try {
      const user = await this.userService.getByEmail(loginData.email);

      const isPasswordMatching = await bcrypt.compare(
        loginData.password,
        user.password,
      );

      if (!isPasswordMatching) {
        throw new HttpException(
          'Wrong credentials provided',
          HttpStatus.BAD_REQUEST,
        );
      }

      return { status: HttpStatus.OK, email: user.email };
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
