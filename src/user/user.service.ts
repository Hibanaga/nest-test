import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAllUsers(): Promise<Array<User>> {
    return this.usersRepository.find({});
  }

  async getByEmail(email: string) {
    const user: Promise<User | null> = this.usersRepository.findOne({
      where: { email },
    });

    if (!!user) {
      return user;
    }

    throw new HttpException(
      "User with this email doen't exist",
      HttpStatus.NOT_FOUND,
    );
  }

  async create(newUserData: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(newUserData);
    console.log('newUser', newUser);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
