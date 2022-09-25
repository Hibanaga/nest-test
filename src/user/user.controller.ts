import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  findAll(): Promise<Array<User>> {
    return this.usersService.getAllUsers();
  }

  @Get()
  findUser(@Param() email: string) {
    return this.usersService.getByEmail(email);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }
}
