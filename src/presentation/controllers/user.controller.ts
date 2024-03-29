import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from 'src/application/service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async allUsers(@Res() response: Response): Promise<any> {
    const usersList = await this.userService.getAllUsers();

    return response.status(200).json(usersList);
  }
}
