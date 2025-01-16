import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<
    {
      id: string;
      name: string;
      email: string;
      password: string;
      avatar?: string;
    }[]
  > {
    return this.usersService.getUsers();
  }
}
