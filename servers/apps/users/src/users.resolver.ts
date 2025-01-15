import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegisterDto } from './dto/users.dto';
import { RegisterResponse } from './types/user.types';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Response } from 'express';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerInput') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill the all fields');
    }
    const user = await this.userService.register(registerDto, context.res);

    return { user };
  }

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }
}
