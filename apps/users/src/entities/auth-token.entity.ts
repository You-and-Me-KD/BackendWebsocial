import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { AUTH_TOKEN_TYPE_ENUM } from '../enums/auth-token.enum';
import { UserEntity } from './user.entity';

@Entity('auth_tokens')
export class AuthTokenEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  token: string;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({
    type: 'enum',
    enum: AUTH_TOKEN_TYPE_ENUM,
    default: AUTH_TOKEN_TYPE_ENUM.VERIFY_REGISTER,
    enumName: 'auth_token_type',
  })
  type: AUTH_TOKEN_TYPE_ENUM;

  @Column({ type: 'bool', default: false })
  isUsed: boolean;

  @ManyToOne(() => UserEntity, (user) => user.authTokens)
  user: UserEntity;
}
