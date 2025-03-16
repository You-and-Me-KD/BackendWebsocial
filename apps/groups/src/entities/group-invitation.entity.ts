import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GROUP_INVITATION_STATUS } from '../enums';
import { GroupEntity } from './group.entity';

@Entity('group_invitations')
export class GroupInvitationEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  invitedBy: string;

  @Column({
    type: 'enum',
    enum: GROUP_INVITATION_STATUS,
    default: GROUP_INVITATION_STATUS.PENDING,
    enumName: 'group_status',
  })
  status: GROUP_INVITATION_STATUS;

  @ManyToOne(() => GroupEntity, (group) => group.invitations)
  group: GroupEntity;
}
