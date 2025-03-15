import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
import { COMMENT_LIKE_TYPE_ENUM } from '../enums';

@Entity('comment_likes')
export class CommentLikeEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  commentId: string;

  @Column({
    type: 'enum',
    enum: COMMENT_LIKE_TYPE_ENUM,
    default: COMMENT_LIKE_TYPE_ENUM.LIKE,
    enumName: 'comment_like_type',
  })
  type: COMMENT_LIKE_TYPE_ENUM;
}
