import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmAbstractRepository } from '@app/common';
import { CategoryEntity } from '../entities';
import { CategoryDomain } from '../domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryMapper } from '../mapper';

@Injectable()
export class CategoryRepository extends TypeOrmAbstractRepository<
  CategoryEntity,
  CategoryDomain
> {
  protected readonly logger = new Logger(CategoryRepository.name);

  constructor(
    @InjectRepository(CategoryEntity)
    categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }

  protected toDomain(entity: CategoryEntity): CategoryDomain {
    return CategoryMapper.toDomain(entity);
  }

  protected toPersistence(domain: CategoryDomain): CategoryEntity {
    return CategoryMapper.toPersistence(domain);
  }
}
