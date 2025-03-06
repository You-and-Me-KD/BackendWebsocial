import { GetUserDto } from './users/dto/get-user.dto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { UnprocessableEntityException } from '@app/common';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    return this.usersRepository.create({
      ...createUserDto,
      hashedPassword: await bcryptjs.hash(createUserDto.password, 10),
    });
  }

  async validateCreateUserDto(createUserDto: CreateUserDto) {
    try {
      await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException('Email already exists');
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(filterQuery: Partial<UserEntity>) {
    return this.usersRepository.findOne({ where: filterQuery });
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne({
      where: {
        id: getUserDto.id,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.findOneAndUpdate(
      { where: { id } },
      updateUserDto,
    );
  }

  remove(id: string) {
    return this.usersRepository.findOneAndDelete({
      where: {
        id,
      },
    });
  }
}
