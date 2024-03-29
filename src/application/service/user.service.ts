import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from 'src/application/dto/user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers() {
    const usersList = await this.userRepository.find();

    return usersList;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async createUser(dto: CreateUserDto) {
    const existUser = await this.findUserByEmail(dto.email);

    if (existUser) return { message: 'User already existy.' };

    const data: CreateUserDto = {
      ...dto,
      id: uuid(),
      password: await bcrypt.hash(dto.password, 10),
      createdAt: new Date(),
    };

    const createdUser = await this.userRepository.save(data);

    if (!createdUser)
      return { errorMessage: 'There was a problem on the server.' };

    return {
      message: 'User created successfully.',
      createdUser,
    };
  }
}
