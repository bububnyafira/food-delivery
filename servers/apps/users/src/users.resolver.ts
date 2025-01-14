import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterDto } from './dto/users.dto';
import { RegisterResponse } from './types/user.types';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    const user = await this.userService.register(registerDto);

    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }
}
