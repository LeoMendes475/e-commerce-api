import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from 'src/application/dto/user';

import { UserService } from 'src/application/service/user.service';
import { IsPublic } from 'src/decorators/is-public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Get()
  async allUsers(@Res() response: Response): Promise<any> {
    const usersList = await this.userService.getAllUsers();

    return response.status(200).json(usersList);
  }

  @Post()
  async createUser(@Body() dto: CreateUserDto, @Res() response: Response) {
    const { message, createdUser, errorMessage } =
      await this.userService.createUser(dto);

    if (!createdUser) return response.status(400).json({ message });

    if (errorMessage) return response.status(500).json({ errorMessage });

    return response.status(200).json({ message, createdUser });
  }
}
