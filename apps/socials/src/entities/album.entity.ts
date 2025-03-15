import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity('albums')
export class AlbumEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  userId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;
}
