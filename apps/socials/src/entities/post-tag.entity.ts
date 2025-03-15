import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';
import { TagEntity } from './tag.entity';

@Entity('post_tags')
export class PostTagEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar' })
  postId: string;

  @Column({ type: 'varchar' })
  tagId: string;

  @ManyToOne(() => PostEntity, (post) => post.tags)
  post: PostEntity;

  @ManyToOne(() => TagEntity, (tag) => tag.postTags)
  tag: TagEntity;
}
