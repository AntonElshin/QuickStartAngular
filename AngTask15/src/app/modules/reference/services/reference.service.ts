import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Reference, ReferencePageSortRequest, ReferencePageSortResponse} from '../interfaces/reference-interfaces';

@Injectable({providedIn: 'root'})
export class ReferenceService {

  constructor(private http: HttpClient) {
  }

  fetch(searchRequest: ReferencePageSortRequest): Observable<ReferencePageSortResponse> {

    let params = new HttpParams();

    if (searchRequest.sort != null && searchRequest.sort.trim() !== '') {
      params = params.append('sort', searchRequest.sort);
    }
    else {
      params = params.append('sort', 'id,asc');
    }
    if (searchRequest.size != null && searchRequest.size.trim() !== '') {
      params = params.append('size', searchRequest.size);
    }
    else {
      params = params.append('size', '10');
    }
    if (searchRequest.page != null && searchRequest.page.trim() !== '') {
      params = params.append('page', searchRequest.page);
    }
    else {
      params = params.append('page', '0');
    }

    if (searchRequest.name != null && searchRequest.name.trim() !== '') {
      params = params.append('name', searchRequest.name);
    }
    if (searchRequest.sysname != null && searchRequest.sysname.trim() !== '') {
      params = params.append('sysname', searchRequest.sysname);
    }

    return this.http.get<ReferencePageSortResponse>('http://localhost:3000/api/references', {
      params
    });
  }

  getById(id: string): Observable<Reference> {
    return this.http.get<Reference>(`http://localhost:3000/api/references/${id}`);
  }

  add(reference: Reference): Observable<Reference> {
    return this.http.post<Reference>('http://localhost:3000/api/references', reference);
  }

  modify(id: string, reference: Reference): Observable<Reference> {
    return this.http.put<Reference>(`http://localhost:3000/api/references/${id}`, {
      name: reference.name,
      sysname: reference.sysname,
      description: reference.description
    });
  }

  remove(id: string): Observable<void> {
    console.log('In delete', id);
    return this.http.delete<void>(`http://localhost:3000/api/references/${id}`);
  }

  validateSysname(sysname: string): Observable<Reference> {
    return this.http.get<Reference>(`http://localhost:3000/api/references/check/${sysname}`);
  }

}
