import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
import { FRIEND_ENUM } from '../enums/friend.enum';

@Entity('friends')
export class FriendEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  friendId: string;

  @Column({
    type: 'enum',
    enum: FRIEND_ENUM,
    default: FRIEND_ENUM.PENDING,
    enumName: 'friend_status',
  })
  status: FRIEND_ENUM;

  @Column({ type: 'timestamp', nullable: true })
  acceptedAt: Date;
}
