import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { POST_TYPE_ENUM, POST_VISIBILITY_ENUM } from '../enums/post.enum';
import { PostImageEntity } from './post-image.entity';
import { PostTagEntity } from './post-tag.entity';

@Entity('posts')
export class PostEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  groupId: string;

  @Column({ type: 'int', default: 0 })
  likeCount: number;

  @Column({ type: 'int', default: 0 })
  commentCount: number;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @Column({ type: 'enum', enum: POST_TYPE_ENUM, default: POST_TYPE_ENUM.POST })
  type: POST_TYPE_ENUM;

  @Column({
    type: 'enum',
    enum: POST_VISIBILITY_ENUM,
    default: POST_VISIBILITY_ENUM.PUBLIC,
    enumName: 'post_visibility',
  })
  visibility: POST_VISIBILITY_ENUM;

  @OneToMany(() => PostImageEntity, (image) => image.post)
  images: PostImageEntity[];

  @OneToMany(() => PostTagEntity, (tag) => tag.post)
  tags: PostTagEntity[];
}
