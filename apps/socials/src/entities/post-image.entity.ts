import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('post_images')
export class PostImageEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  imageId: string;

  @ManyToOne(() => PostEntity, (post) => post.images)
  post: PostEntity;
}
