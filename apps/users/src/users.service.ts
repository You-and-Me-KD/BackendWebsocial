import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      hashedPassword: 'hashedPassword',
    });
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ where: { id } });
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
