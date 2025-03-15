import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('stream_schedule')
export class StreamScheduleEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  // 1|2|3|4|5|6|7
  @Column({ type: 'varchar', length: 25 })
  schedule: string;

  @ManyToOne(() => UserEntity, (user) => user.streamSchedules)
  user: UserEntity;
}
