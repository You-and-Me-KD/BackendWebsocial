import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('post_shares')
export class PostShareEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 50 })
  postId: string;
}
