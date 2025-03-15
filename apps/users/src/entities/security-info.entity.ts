import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { SecurityInfoQuestionEntity } from './security-info-question.entity';

@Entity('security_info')
export class SecurityInfoEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  recoveryEmail: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  recoveryPhoneNumber: string;

  @OneToOne(() => UserEntity, (user) => user.securityInfo)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(
    () => SecurityInfoQuestionEntity,
    (question) => question.securityInfo,
    { cascade: true },
  )
  securityInfoQuestion: SecurityInfoQuestionEntity[];
}
