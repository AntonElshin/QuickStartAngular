import {PageSortRequest, PageSortResponse} from '../../../interfaces/common-interfaces';

export interface Reference {
  id?: string;
  name: string;
  sysname: string;
  description: string;
}

export interface ReferencePageSortRequest extends PageSortRequest {
  name: string;
  sysname: string;
}

export interface ReferencePageSortResponse extends PageSortResponse {
  content: Reference[];
}
