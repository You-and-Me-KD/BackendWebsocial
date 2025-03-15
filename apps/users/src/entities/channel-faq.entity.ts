import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('channel_faq')
export class ChannelFAQEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @ManyToOne(() => UserEntity, (user) => user.channelFaq)
  user: UserEntity;
}
