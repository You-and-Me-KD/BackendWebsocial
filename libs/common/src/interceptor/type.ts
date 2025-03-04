export interface Meta {
  code: number;
  message: string;
  pagination: Pagination;
  path: string;
}

export interface Pagination {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Response<T> {
  meta: Meta;
  data: T | Array<T>;
}
