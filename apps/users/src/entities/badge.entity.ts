import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserBadgeEntity } from './user-badge.entity';

@Entity('badges')
export class BadgeEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  imageId: string;

  @Column({ type: 'int', default: 0 })
  target: number;

  @Column({ type: 'int', default: 0 })
  level: number;

  @Column({ type: 'int', default: 0 })
  exp: number;

  @OneToMany(() => UserBadgeEntity, (userBadge) => userBadge.badge)
  userBadges: UserBadgeEntity[];
}
