import { FILE_ENUM } from './../enums/file.enum';
import { TypeOrmAbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class FileEntity extends TypeOrmAbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'enum', default: FILE_ENUM.IMAGE, enum: FILE_ENUM })
  type: FILE_ENUM;
}
