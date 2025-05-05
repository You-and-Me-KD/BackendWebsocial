import {
  AuthTokenDto,
  BadRequestException,
  handleServiceException,
  RegisterDto,
  UnprocessableEntityException,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import * as bcryptjs from 'bcryptjs';
import { UserDomain } from '../domain';
import { GetUserDto } from '../dto';
import { UsersRepository } from '../repositories/users.repository';
import { AUTH_TOKEN_TYPE_ENUM } from '../enums/auth-token.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(data: RegisterDto & { authTokens: AuthTokenDto }) {
    try {
      await this.validateRegister(data);
      const hashedPassword = await bcryptjs.hash(data.password, 10);
      return await this.usersRepository.create({
        ...data,
        hashedPassword,
        authTokens: [
          {
            ...data.authTokens,
            type: AUTH_TOKEN_TYPE_ENUM.VERIFY_REGISTER,
          },
        ],
      });
    } catch (error) {
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

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne({
      where: {
        id: getUserDto.id,
      },
    });
  }

  async verifyToken({ email }: { email: string }) {
    try {
      const user = await this.usersRepository.findOne({
        where: {
          email,
        },
      });

      if (user.isVerify) {
        throw new UnprocessableEntityException('User already verified');
      }

      return await this.usersRepository.update({
        ...user,
        isVerify: true,
      });
    } catch (error) {
      handleServiceException(error, BadRequestException);
    }
  }
}
