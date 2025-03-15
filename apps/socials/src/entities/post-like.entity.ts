import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';
import { POST_LIKE_TYPE_ENUM } from '../enums/post.enum';

@Entity('post_likes')
export class PostLikeEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  postId: string;

  @Column({
    type: 'enum',
    enum: POST_LIKE_TYPE_ENUM,
    default: POST_LIKE_TYPE_ENUM.LIKE,
    enumName: 'post_like_type',
  })
  type: POST_LIKE_TYPE_ENUM;
}
