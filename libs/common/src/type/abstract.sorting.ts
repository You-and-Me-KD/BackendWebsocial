import { FindManyOptions, FindOptionsOrder } from 'typeorm';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}
export interface SortOptions<T> {
  orderBy?: keyof T;
  orderDirection?: SortDirection;
}

export abstract class AbstractSorting<T> {
  applySorting(options: SortOptions<T>): FindManyOptions<T> {
    if (options.orderBy) {
      return {
        order: {
          [options.orderBy]: options.orderDirection || SortDirection.ASC,
        } as FindOptionsOrder<T>,
      };
    }
    return {};
  }
}
