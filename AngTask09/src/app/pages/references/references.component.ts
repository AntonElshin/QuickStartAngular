import { Component, OnInit, DoCheck, OnDestroy} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Subscription} from 'rxjs';

import {Page} from '../../interfaces/common-interfaces';
import {Reference, ReferencePageSortRequest, ReferencePageSortResponse} from '../../interfaces/reference-interfaces';
import {Observable} from 'rxjs';

// declare var $: any;

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit, DoCheck, OnDestroy {

  gSub: Subscription;

  form: FormGroup;

  pageSortResponse: ReferencePageSortResponse;

  curPage = 0;
  totalPage = 0;
  size = 10;

  references: Reference[] = [];
  selectedReference: Reference;
  pages: Page[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }

  ngDoCheck(): void {

    /*const selRow = document.getElementsByClassName('selected')[0];
    if (selRow !== undefined) {
      const selNode = selRow.children[0];
      if (selNode !== undefined) {
        if (selNode.innerHTML !== null) {
          for (let i = 0; i < this.references.length; i++) {
            const ref = this.references[i];
            if (+ref.id === +selNode.innerHTML) {
              this.selectedReference = ref;
              break;
            }
          }
        }
      }
    }
    else {
      this.selectedReference = null;
    }*/
  }

  fillPages(): void {

    this.pages = [];
    let i = 0;

    for (i = 0; i < this.totalPage; i++) {
      const page: Page = {
        id: i,
        name: String(i + 1)
      };
      this.pages.push(page);
    }

  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      sysname: new FormControl(null)
    });

    this.fetch(0);

  }

  fetch(requestPage: number): void {

    this.selectedReference = null;

    const searchRequest: ReferencePageSortRequest = {
      page: requestPage ? String(requestPage) : String(0),
      sort: null,
      size: String(this.size),
      name: this.form.value.name ? this.form.value.name : null,
      sysname: this.form.value.sysname ? this.form.value.sysname : null
    };

    this.gSub = this.getByParams(searchRequest)
      .subscribe(response => {
        this.pageSortResponse = response;
        this.curPage = this.pageSortResponse.number;
        this.totalPage = this.pageSortResponse.totalPages;
        this.references = this.pageSortResponse.content;
        this.fillPages();

        /*$(document).ready(function(){
          $('tr').click(function(){
            $('tr').removeClass();
            $(this).addClass('selected');
          });
        });*/
      });
  }

  getByParams(searchRequest: ReferencePageSortRequest): Observable<ReferencePageSortResponse> {

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

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

  onSelected(id: string): void {

    for (let i = 0; i < this.references.length; i++) {
      const ref = this.references[i];
      if (+ref.id === +id) {
        this.selectedReference = ref;
        break;
      }
    }
  }
}
