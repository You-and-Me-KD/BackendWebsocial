import { Injectable, Logger } from '@nestjs/common';
import { FileEntity } from './entities/file.entity';
import { TypeOrmAbstractRepository } from '@app/common';
import { FileDomain } from './domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileMapper } from './mapper/file.mapper';

@Injectable()
export class FilesRepository extends TypeOrmAbstractRepository<
  FileEntity,
  FileDomain
> {
  protected readonly logger = new Logger(FilesRepository.name);
  constructor(
    @InjectRepository(FileEntity) fileRepository: Repository<FileEntity>,
  ) {
    super(fileRepository);
  }

  protected toDomain(entity: FileEntity): FileDomain {
    return FileMapper.toDomain(entity);
  }

  protected toPersistence(domain: FileDomain): FileEntity {
    return FileMapper.toPersistence(domain);
  }
}
