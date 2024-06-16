import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateOrderDto } from '../dto/order';
import { OrderEntity } from 'src/domain/entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const order = new OrderEntity();

    order.id = uuid();
    order.userId = '10b8690c-7608-4052-a012-9c5125fbd5ab';
    order.buyerName = dto.buyerName;
    order.buyerPassport = dto.buyerPassport;
    order.buyerOrganization = dto.buyerOrganization;
    order.orderQuantity = dto.orderQuantity;
    order.productId = dto.productId;
    order.sellDate = dto.sellDate;
    order.userCreatedId = '10b8690c-7608-4052-a012-9c5125fbd5ab';
    order.createdAt = new Date();

    const createdOrder = await this.orderRepository.save(order);

    return {
      message: 'Order created successfully.',
      createdOrder,
    };
  }

  async findAll() {
    const query = await this.orderRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });

    if (!query) return { message: 'We have a problem in the server' };

    return {
      message: 'Order created successfully.',
      Orders: query,
    };
  }

  async findById(id: string) {
    const query = await this.orderRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!query) return { message: 'order not found' };

    return {
      message: 'Order finded successfully.',
      Orders: query,
    };
  }

  async delete(id: string) {
    const query = await this.orderRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!query) return { message: 'order not found' };

    query.deletedAt = new Date();
    query.userDeletedId = '10b8690c-7608-4052-a012-9c5125fbd5ab';

    await this.orderRepository.save(query);

    return {
      message: 'Order deleted successfully.',
    };
  }
}
