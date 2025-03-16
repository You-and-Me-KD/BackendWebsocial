import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { GroupEntity } from './group.entity';

@Entity('group_social_networks')
export class GroupSocialNetworkEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'uuid', nullable: false })
  socialNetworkId: string;

  @Column({ type: 'uuid', nullable: false })
  groupId: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  url: string;

  @ManyToOne(() => GroupEntity, (group) => group.groupSocialNetworks)
  group: GroupEntity;
}
