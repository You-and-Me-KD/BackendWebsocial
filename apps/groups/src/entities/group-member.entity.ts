import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GROUP_MEMBER_STATUS, GROUP_MEMBER_ROLE } from '../enums';
import { GroupEntity } from './group.entity';

@Entity('group_members')
export class GroupMemberEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'text', nullable: true })
  roles: string;

  @Column({
    type: 'enum',
    enum: GROUP_MEMBER_ROLE,
    default: GROUP_MEMBER_ROLE.MEMBER,
    enumName: 'group_member_role',
  })
  role: GROUP_MEMBER_ROLE;

  @Column({
    type: 'enum',
    enum: GROUP_MEMBER_STATUS,
    default: GROUP_MEMBER_STATUS.PENDING,
    enumName: 'group_status',
  })
  status: GROUP_MEMBER_STATUS;

  @ManyToOne(() => GroupEntity, (group) => group.members)
  group: GroupEntity;
}
