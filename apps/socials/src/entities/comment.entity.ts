import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
import { COMMENTABLE_TYPE_ENUM } from '../enums';

@Entity('comments')
export class CommentEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({
    type: 'enum',
    enum: COMMENTABLE_TYPE_ENUM,
    default: COMMENTABLE_TYPE_ENUM.POST,
    enumName: 'commentable_type',
  })
  type: COMMENTABLE_TYPE_ENUM;

  @Column({ type: 'varchar', length: 50 })
  // it use to define for which postId or ProductId or any other entity id this comment is
  commentableId: string;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'int', default: 0 })
  commentCount: number;

  @Column({ type: 'varchar', length: 50 })
  parentId: string;

  @Column({ type: 'text' })
  content: string;
}
