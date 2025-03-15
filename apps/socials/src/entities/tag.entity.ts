import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostTagEntity } from './post-tag.entity';

@Entity('tags')
export class TagEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  slug: string;

  @Column({ type: 'int', default: 0 })
  count: number;

  @OneToMany(() => PostTagEntity, (postTag) => postTag.tag)
  postTags: PostTagEntity[];
}
