import { FindManyOptions, FindOptionsOrder } from 'typeorm';

export interface SortOptions<T> {
  orderBy?: keyof T;
  orderDirection?: 'ASC' | 'DESC';
}

export abstract class AbstractSorting<T> {
  applySorting(options: SortOptions<T>): FindManyOptions<T> {
    if (options.orderBy) {
      return {
        order: {
          [options.orderBy]: options.orderDirection || 'ASC',
        } as FindOptionsOrder<T>,
      };
    }
    return {};
  }
}
