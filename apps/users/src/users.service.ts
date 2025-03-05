import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users/entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      hashedPassword: await bcryptjs.hash(createUserDto.password, 10),
    });
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(filterQuery: Partial<UserEntity>) {
    return this.usersRepository.findOne({ where: filterQuery });
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
