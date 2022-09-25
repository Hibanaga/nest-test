import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterAuthenticationDto } from '../authentication/dto/register-authentication.dto';
import { PostressErrorCodes } from '../../types/Postgres.types';

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

  async register(
    newUser: RegisterAuthenticationDto,
  ): Promise<{ status: number; email: string }> {
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    try {
      const createdUser = await this.usersRepository.create({
        ...newUser,
        password: hashedPassword,
      });
      await this.usersRepository.save(createdUser);

      return { status: HttpStatus.OK, email: createdUser.email };
    } catch (error) {
      if (error?.code === PostressErrorCodes.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
