import { PaginationOptions } from '@app/common/type/abstract.pagination';
import {
  AbstractSorting,
  SortOptions,
} from '@app/common/type/abstract.sorting';
import { Logger } from '@nestjs/common';
import {
  DeepPartial,
  FindOneOptions,
  FindOptionsOrder,
  Repository,
} from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { ErrorCode, NotFoundException } from '@app/common';

export abstract class AbstractRepository<
  TEntity extends AbstractEntity,
  TDomain,
> extends AbstractSorting<TEntity> {
  protected abstract readonly logger: Logger;
  protected abstract toDomain(entity: TEntity): TDomain;

  protected abstract toPersistence(domain: TDomain): TEntity;

  constructor(protected readonly repository: Repository<TEntity>) {
    super();
  }

  async create(
    createDomain: Omit<TDomain, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<TDomain> {
    const entity = this.toPersistence(createDomain as TDomain);
    const savedEntity = await this.repository.save(
      entity as DeepPartial<TEntity>,
    );
    return this.toDomain(savedEntity);
  }

  async update(updateDomain: DeepPartial<TDomain>): Promise<TDomain> {
    const updatedEntity = await this.repository.save(
      this.toPersistence(updateDomain as TDomain),
    );
    return this.toDomain(updatedEntity);
  }

  async findOne(filterQuery: FindOneOptions<TEntity>): Promise<TDomain> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(ErrorCode.NOT_FOUND);
    }
    return this.toDomain(entity);
  }

  async findOneAndUpdate(
    filterQuery: FindOneOptions<TEntity>,
    updateDomain: DeepPartial<TDomain>,
  ): Promise<TDomain> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(ErrorCode.NOT_FOUND);
    }
    this.repository.merge(entity, this.toPersistence(updateDomain as TDomain));
    const updatedEntity = await this.repository.save(entity);
    return this.toDomain(updatedEntity);
  }

  async find(filterQuery: FindOneOptions<TEntity>): Promise<TDomain[]> {
    const entities = this.repository.find(filterQuery);
    return entities.then((entities) => entities.map(this.toDomain));
  }

  async findOneAndDelete(
    filterQuery: FindOneOptions<TEntity>,
  ): Promise<TDomain> {
    const entity = await this.repository.findOne(filterQuery);
    if (!entity) {
      this.logger.warn(
        `Entity not found with filter: ${JSON.stringify(filterQuery)}`,
      );
      throw new NotFoundException(ErrorCode.NOT_FOUND);
    }
    await this.repository.softRemove(entity);
    return this.toDomain(entity);
  }

  async findWithPagination(
    filterQuery: FindOneOptions<TEntity>,
    sortOptions: SortOptions<TEntity>,
    paginationOptions: PaginationOptions,
  ): Promise<[TDomain[], number]> {
    const sortingOptions = this.applySorting(sortOptions);
    const [data, totalCount] = await this.repository.findAndCount({
      ...filterQuery,
      skip:
        ((paginationOptions.page || 1) - 1) * (paginationOptions.limit || 10),

      take: paginationOptions.limit || 10,
      order: sortingOptions.order as FindOptionsOrder<TEntity>,
    });
    return [data.map(this.toDomain), totalCount];
  }
}
