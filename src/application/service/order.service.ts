import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from 'src/domain/entities/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createOrder(dto: any) {
    return {
      message: 'Order created successfully.',
      createdOrder: null,
    };
  }
}
