import { FileDomain } from '../domain';
import { FileEntity } from '../entities';

export class FileMapper {
  static toDomain(raw: FileEntity): FileDomain {
    const file = new FileDomain();
    file.id = raw.id;
    file.url = raw.url;
    file.type = raw.type;
    file.createdAt = raw.createdAt;
    file.updatedAt = raw.updatedAt;
    file.deletedAt = raw.deletedAt;
    return file;
  }

  static toPersistence(domain: FileDomain): FileEntity {
    const file = new FileEntity();
    file.id = domain.id;
    file.url = domain.url;
    file.type = domain.type;
    file.createdAt = domain.createdAt;
    file.updatedAt = domain.updatedAt;
    file.deletedAt = domain.deletedAt;
    return file;
  }
}
