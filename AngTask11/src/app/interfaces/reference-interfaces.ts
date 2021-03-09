import {PageSortRequest, PageSortResponse} from './common-interfaces';

export interface Reference {
  id?: string;
  name: string;
  sysname: string;
  description?: string;
  author?: string;
  creationDate?: Date;
  elementQuantity?: number;
}

export interface ReferencePageSortRequest extends PageSortRequest {
  name: string;
  sysname: string;
}

export interface ReferencePageSortResponse extends PageSortResponse {
  content: Reference[];
}
