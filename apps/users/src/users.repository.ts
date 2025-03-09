import { TypeOrmAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { UserEntity } from './users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDomain } from './users/domain';
import { UserMapper } from './users/mapper/user.mapper';

@Injectable()
export class UsersRepository extends TypeOrmAbstractRepository<
  UserEntity,
  UserDomain
> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectRepository(UserEntity) usersRepository: Repository<UserEntity>,
  ) {
    super(usersRepository);
  }

  protected toDomain(entity: UserEntity): UserDomain {
    return UserMapper.toDomain(entity);
  }

  protected toPersistence(domain: UserDomain): UserEntity {
    return UserMapper.toPersistence(domain);
  }
}
