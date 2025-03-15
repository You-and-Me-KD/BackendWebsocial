import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('job_and_education')
export class JobAndEducationEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  title: string;

  @Column({ type: 'timestamp', nullable: true })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => UserEntity, (user) => user.jobAndEducations)
  user: UserEntity;
}
