import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActivationDto, RegisterDto } from './dto/users.dto';
import { ActivationResponse, RegisterResponse } from './types/user.types';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Response } from 'express';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation(() => RegisterResponse)
  async register(
    @Args('registerDto') registerDto: RegisterDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    if (!registerDto.name || !registerDto.email || !registerDto.password) {
      throw new BadRequestException('Please fill all the fields');
    }

    const { activation_token } = await this.userService.register(
      registerDto,
      context.res,
    );

    return { activation_token };
  }

  @Mutation(() => ActivationResponse)
  async activateUser(
    @Args('activationInput') activationDto: ActivationDto,
    @Context() context: { res: Response },
  ): Promise<RegisterResponse> {
    return await this.userService.activateUser(activationDto, context.res);
  }

  @Query(() => [User])
  async getUsers() {
    return await this.userService.getUsers();
  }
}
