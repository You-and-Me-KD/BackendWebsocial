import { TypeOrmAbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthTokenDomain } from '../domain';
import { AuthTokenEntity } from '../entities';
import { AuthTokenMapper } from '../mapper';

@Injectable()
export class AuthTokenRepository extends TypeOrmAbstractRepository<
  AuthTokenEntity,
  AuthTokenDomain
> {
  protected readonly logger = new Logger(AuthTokenRepository.name);

  constructor(
    @InjectRepository(AuthTokenEntity)
    authTokenRepository: Repository<AuthTokenEntity>,
  ) {
    super(authTokenRepository);
  }

  protected toDomain(entity: AuthTokenEntity): AuthTokenDomain {
    return AuthTokenMapper.toDomain(entity);
  }

  protected toPersistence(domain: AuthTokenDomain): AuthTokenEntity {
    return AuthTokenMapper.toPersistence(domain);
  }
}
