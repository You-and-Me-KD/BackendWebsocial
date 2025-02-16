import { PaginationOptions } from '@app/common/type/abstract.pagination';
import {
  AbstractSorting,
  SortOptions,
} from '@app/common/type/abstract.sorting';
import { Logger, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsOrder,
  Repository,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';

export abstract class AbstractRepository<
  TEntity extends AbstractEntity,
> extends AbstractSorting<TEntity> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly repository: Repository<TEntity>) {
    super();
  }

  async create(
    createEntity: Omit<TEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TEntity> {
    const entity = this.repository.create(createEntity as DeepPartial<TEntity>);
    return this.repository.save(entity);
  }

  async findOne(filterQuery: FindOneOptions<TEntity>): Promise<TEntity> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  async findOneAndUpdate(
    filterQuery: FindOneOptions<TEntity>,
    updateEntity: DeepPartial<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Entity not found');
    }
    this.repository.merge(entity, updateEntity);
    return this.repository.save(entity);
  }

  async find(filterQuery: FindOneOptions<TEntity>): Promise<TEntity[]> {
    return this.repository.find(filterQuery);
  }

  async findOneAndDelelte(
    filterQuery: FindOneOptions<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException('Entity not found');
    }
    return this.repository.softRemove(entity);
  }

  async findWithPagination(
    filterQuery: FindOneOptions<TEntity>,
    sortOptions: SortOptions<TEntity>,
    paginationOptions: PaginationOptions,
  ): Promise<[TEntity[], number]> {
    const sortingOptions = this.applySorting(sortOptions);
    const [data, totalCount] = await this.repository.findAndCount({
      ...filterQuery,
      skip:
        ((paginationOptions.page || 1) - 1) * (paginationOptions.limit || 10),

      take: paginationOptions.limit || 10,
      order: sortingOptions.order as FindOptionsOrder<TEntity>,
    });
    return [data, totalCount];
  }
}
