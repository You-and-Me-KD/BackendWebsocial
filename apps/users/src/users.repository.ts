import { TypeOrmAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDomain } from './domain';
import { UserEntity } from './entities';
import { UserMapper } from './mapper/user.mapper';

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
