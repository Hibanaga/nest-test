import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }

  @Get()
  findUser(@Param() email: string) {
    return this.usersService.logIn(email);
  }
}
