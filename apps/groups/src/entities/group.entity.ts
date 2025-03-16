import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { GROUP_TYPE } from '../enums';
import { GroupMemberEntity } from './group-member.entity';
import { GroupSocialNetworkEntity } from './group-social-network.entity';

@Entity('groups')
export class GroupEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  tagLine: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicWebsite: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  publicPhone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarId: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  coverId: string;

  @Column({ type: 'int', default: 0 })
  memberCount: number;

  @Column({ type: 'int', default: 0 })
  postCount: number;

  @Column({ type: 'int', default: 0 })
  viewCount: number;

  @Column({
    type: 'enum',
    enum: GROUP_TYPE,
    default: GROUP_TYPE.PUBLIC,
    enumName: 'group_type',
  })
  type: GROUP_TYPE;

  @Column({ type: 'text', nullable: true })
  roles: string;

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  members: GroupMemberEntity[];

  @OneToMany(() => GroupMemberEntity, (groupMember) => groupMember.group)
  invitations: GroupMemberEntity[];

  @OneToMany(
    () => GroupSocialNetworkEntity,
    (groupSocialNetwork) => groupSocialNetwork.group,
  )
  groupSocialNetworks: GroupSocialNetworkEntity[];
}
