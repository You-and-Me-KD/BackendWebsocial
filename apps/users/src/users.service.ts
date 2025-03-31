import {
  BadRequestException,
  handleServiceException,
  MICRO_SERVICE_KEYS,
  RegisterDto,
  UnprocessableEntityException,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';
import { UserDomain } from './domain';
import { GetUserDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(registerDto: RegisterDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: [
          { email: registerDto.email },
          { username: registerDto.username },
        ],
      });
      console.log(existingUser);
      if (existingUser) {
        throw new RpcException('Email or username already exists1');
      }
      const hashedPassword = await bcryptjs.hash(registerDto.password, 10);
      return await this.usersRepository.create({
        ...registerDto,
        hashedPassword,
      });
    } catch (error) {
      console.log(error instanceof Error, 'cccc');
      handleServiceException(error, BadRequestException);
    }
  }

  async validateRegister(registerDto: Pick<RegisterDto, 'email' | 'username'>) {
    try {
      await this.usersRepository.findOne({
        where: [
          { email: registerDto.email },
          { username: registerDto.username },
        ],
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email or username already exists');
  }

  async findOne(@Payload() filterQuery: Partial<UserDomain>) {
    return await this.usersRepository.findOne({ where: filterQuery });
  }

  @MessagePattern(MICRO_SERVICE_KEYS.USERS.GET_USER)
  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne({
      where: {
        id: getUserDto.id,
      },
    });
  }
}
