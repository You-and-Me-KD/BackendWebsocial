import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { SEE_CHAT_ACTIVITY, SEE_PROFILE, SEND_FRIEND_REQUEST } from '../enums';
import { UserEntity } from './user.entity';

@Entity('user_permissions')
export class UserPermissionEntity extends TypeOrmAbstractEntity {
  @Column({
    type: 'enum',
    enum: SEE_PROFILE,
    default: SEE_PROFILE.MEMBER,
  })
  seeProfile: SEE_PROFILE;

  @Column({
    type: 'enum',
    enum: SEND_FRIEND_REQUEST,
    default: SEND_FRIEND_REQUEST.FRIEND_OF_FRIEND,
  })
  sendFriendRequest: SEND_FRIEND_REQUEST;

  @Column({
    type: 'enum',
    enum: SEE_CHAT_ACTIVITY,
    default: SEE_CHAT_ACTIVITY.FRIEND_ONLY,
  })
  seeChatActivity: SEE_CHAT_ACTIVITY;

  @OneToOne(() => UserEntity, (user) => user.userPermission)
  @JoinColumn()
  user: UserEntity;
}
