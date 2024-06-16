import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrderService } from 'src/application/service/order.service';

@Controller('user')
export class UserController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  async createUser(@Body() dto: any, @Res() response: Response) {
    const { message, createdOrder } = await this.orderService.createOrder(dto);

    if (!createdOrder) return response.status(400).json({ message });

    // if (errorMessage) return response.status(500).json({ errorMessage });

    return response.status(200).json({ message, createdOrder });
  }
}
