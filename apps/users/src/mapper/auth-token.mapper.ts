import { AuthTokenDomain } from '../domain/auth-token.domain';
import { AuthTokenEntity } from '../entities/auth-token.entity';

export class AuthTokenMapper {
  static toDomain(raw: AuthTokenEntity): AuthTokenDomain {
    const authToken = new AuthTokenDomain();
    authToken.id = raw.id;
    authToken.token = raw.token;
    authToken.expiresAt = raw.expiresAt;
    authToken.createdAt = raw.createdAt;
    authToken.updatedAt = raw.updatedAt;
    authToken.deletedAt = raw.deletedAt;
    return authToken;
  }

  static toPersistence(domain: AuthTokenDomain): AuthTokenEntity {
    const authToken = new AuthTokenEntity();
    authToken.id = domain.id!;
    authToken.token = domain.token;
    authToken.expiresAt = domain.expiresAt;
    authToken.createdAt = domain.createdAt!;
    authToken.updatedAt = domain.updatedAt!;
    authToken.deletedAt = domain.deletedAt!;
    return authToken;
  }
}
