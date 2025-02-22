import { TypeOrmAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository extends TypeOrmAbstractRepository<UserEntity> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }
}
