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
    if (domain.id) {
      file.id = domain.id;
    }
    file.url = domain.url;
    file.type = domain.type;
    if (domain.createdAt) {
      file.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      file.updatedAt = domain.updatedAt;
    }
    if (domain.deletedAt) {
      file.deletedAt = domain.deletedAt;
    }
    return file;
  }
}
