import { CategoryDomain } from '../domain';
import { CategoryEntity } from '../entities';

export class CategoryMapper {
  static toDomain(entity: CategoryEntity): CategoryDomain {
    const category = new CategoryDomain();
    category.id = entity.id;
    category.title = entity.title;
    category.description = entity.description;
    category.createdAt = entity.createdAt;
    category.updatedAt = entity.updatedAt;
    return category;
  }

  static toPersistence(domain: CategoryDomain): CategoryEntity {
    const category = new CategoryEntity();
    category.id = domain.id;
    category.title = domain.title;
    category.description = domain.description;
    if (domain.createdAt) {
      category.createdAt = domain.createdAt;
    }
    if (domain.updatedAt) {
      category.updatedAt = domain.updatedAt;
    }
    return category;
  }
}
