import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

import {Page} from '../../../../interfaces/common-interfaces';
import {Reference, ReferencePageSortRequest, ReferencePageSortResponse} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';


@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit, OnDestroy {

  gSub: Subscription;
  dSub: Subscription;

  form: FormGroup;

  pageSortResponse: ReferencePageSortResponse;

  curPage = 0;
  totalPage = 0;
  size = 10;

  references: Reference[] = [];
  pages: Page[] = [];

  constructor(
    private referenceService: ReferenceService,
    private router: Router
  ) { }

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

    console.log('requestPage', requestPage);

    const searchRequest: ReferencePageSortRequest = {
      page: requestPage ? String(requestPage) : String(0),
      sort: null,
      size: String(this.size),
      name: this.form.value.name ? this.form.value.name : null,
      sysname: this.form.value.sysname ? this.form.value.sysname : null
    };

    this.gSub = this.referenceService.fetch(searchRequest)
      .subscribe(response => {
        console.log('Response', response);
        this.pageSortResponse = response;
        this.curPage = this.pageSortResponse.number;
        this.totalPage = this.pageSortResponse.totalPages;
        this.references = this.pageSortResponse.content;
        console.log('this.references', this.references);
        this.fillPages();
      });

  }

  remove(id: string): void {
    this.dSub = this.referenceService.remove(id).subscribe(() => {
      console.log('delete');
      this.fetch(0);
    });
  }

  goToAddPage(): void {
    this.router.navigate(['/reference', 'create']);
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
