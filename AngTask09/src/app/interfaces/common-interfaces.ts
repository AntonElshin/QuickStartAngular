export interface PageSortRequest {
  sort: string;
  size: string;
  page: string;
}

export interface Page {
  id: number;
  name: string;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: true;
  sort: Sort[];
}

export interface PageSortResponse {
  content: object[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
