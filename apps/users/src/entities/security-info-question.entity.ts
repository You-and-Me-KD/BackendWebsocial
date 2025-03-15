import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { SecurityInfoEntity } from './security-info.entity';
import { SecurityQuestionEntity } from './security-question.entity';

@Entity('security_info_questions')
export class SecurityInfoQuestionEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'text', nullable: true })
  answer: string;

  @ManyToOne(
    () => SecurityInfoEntity,
    (securityInfo) => securityInfo.securityInfoQuestion,
    {
      // When a SecurityInfoEntity is deleted, delete all SecurityInfoQuestionEntity that reference it
      onDelete: 'CASCADE',
    },
  )
  securityInfo: SecurityInfoEntity;

  @ManyToOne(
    () => SecurityQuestionEntity,
    (securityQuestion) => securityQuestion.securityInfoQuestion,
    {
      // When a SecurityQuestionEntity is deleted, delete all SecurityInfoQuestionEntity that reference it
      onDelete: 'CASCADE',
    },
  )
  securityQuestion: SecurityQuestionEntity;
}
