import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { SecurityInfoQuestionEntity } from './security-info-question.entity';

@Entity('security_question')
export class SecurityQuestionEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => SecurityInfoQuestionEntity, (siq) => siq.securityQuestion)
  securityInfoQuestion: SecurityInfoQuestionEntity[];
}
