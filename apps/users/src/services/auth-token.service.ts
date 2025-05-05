import { Injectable } from '@nestjs/common';
import { AuthTokenRepository } from '../repositories/auth-token.repository';
import { AuthTokenEntity } from '../entities';
import { FindOneOptions } from 'typeorm';
import { AuthTokenDomain } from '../domain';

@Injectable()
export class AuthTokenService {
  constructor(private readonly authTokenRepository: AuthTokenRepository) {}

  async findOneAndDelete(
    filterQuery: FindOneOptions<AuthTokenEntity>,
  ): Promise<AuthTokenDomain> {
    return await this.authTokenRepository.findOneAndDelete(filterQuery);
  }

  async findOne(
    filterQuery: FindOneOptions<AuthTokenEntity>,
  ): Promise<AuthTokenDomain> {
    return await this.authTokenRepository.findOne(filterQuery);
  }
}
