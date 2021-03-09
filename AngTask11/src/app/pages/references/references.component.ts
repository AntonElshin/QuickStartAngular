import { Component, OnInit, DoCheck} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router} from '@angular/router';

import {Page} from '../../interfaces/common-interfaces';
import {Reference, ReferencePageSortRequest, ReferencePageSortResponse} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';

declare var $: any;

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit, DoCheck {

  form: FormGroup;

  pageSortResponse: ReferencePageSortResponse;

  curPage = 0;
  totalPage = 0;
  size = 10;

  references: Reference[] = [];
  selectedReference: Reference;
  pages: Page[] = [];

  author: string;
  creationDate: Date;
  elementQuantity: string;

  constructor(
    private referenceService: ReferenceService,
    private router: Router
  ) {
  }

  ngDoCheck(): void {

    const selRow = document.getElementsByClassName('selected')[0];
    if (selRow !== undefined) {
      const selNode = selRow.children[0];
      if (selNode !== undefined) {
        if (selNode.innerHTML !== null) {
          for (let i = 0; i < this.references.length; i++) {
            const ref = this.references[i];
            if (+ref.id === +selNode.innerHTML) {
              console.log('this.selectedReference', this.selectedReference);
              this.selectedReference = ref;
              break;
            }
          }
        }
      }
    }
    else {
      this.selectedReference = null;
    }
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

    const searchRequest: ReferencePageSortRequest = {
      page: requestPage ? String(requestPage) : String(0),
      sort: null,
      size: String(this.size),
      name: this.form.value.name ? this.form.value.name : null,
      sysname: this.form.value.sysname ? this.form.value.sysname : null
    };

    this.referenceService.fetch(searchRequest)
      .subscribe(response => {
        this.pageSortResponse = response;
        this.curPage = this.pageSortResponse.number;
        this.totalPage = this.pageSortResponse.totalPages;
        this.references = this.pageSortResponse.content;
        this.fillPages();

        $(document).ready(function(){
          $('tr').click(function(){
            $('tr').removeClass();
            $(this).addClass('selected');
          });
        });
      });
  }
}
