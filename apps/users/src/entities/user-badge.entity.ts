import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { USER_BADGE_ENUM_STATUS } from '../enums/user-badge.enum';
import { BadgeEntity } from './badge.entity';
import { UserEntity } from './user.entity';

@Entity('user_badges')
export class UserBadgeEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'enum',
    enum: USER_BADGE_ENUM_STATUS,
    default: USER_BADGE_ENUM_STATUS.UNLOCKED,
    enumName: 'user_badge_status',
  })
  status: USER_BADGE_ENUM_STATUS;

  @Column({ type: 'int', default: 0 })
  currentTarget: number;

  @ManyToOne(() => BadgeEntity, (badge) => badge.userBadges)
  badge: BadgeEntity;

  @ManyToOne(() => UserEntity, (user) => user.userBadges)
  user: UserEntity;
}
