import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateOrderDto } from 'src/application/dto/order';
import { OrderService } from 'src/application/service/order.service';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @IsPublic()
  @Get()
  async findAllOrders(@Res() response: Response) {
    const { message, Orders } = await this.orderService.findAll();

    if (!Orders) return response.status(400).json({ message });

    // if (errorMessage) return response.status(500).json({ errorMessage });

    return response.status(200).json({ message, Orders });
  }

  @IsPublic()
  @Post()
  async createOrder(@Body() dto: CreateOrderDto, @Res() response: Response) {
    const { message, createdOrder } = await this.orderService.createOrder(dto);

    if (!createdOrder) return response.status(400).json({ message });

    // if (errorMessage) return response.status(500).json({ errorMessage });

    return response.status(200).json({ message, createdOrder });
  }
}
