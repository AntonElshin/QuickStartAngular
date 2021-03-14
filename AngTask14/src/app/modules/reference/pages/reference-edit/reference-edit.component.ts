import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Reference} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';
import {switchMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-reference-edit',
  templateUrl: './reference-edit.component.html',
  styleUrls: ['./reference-edit.component.css']
})
export class ReferenceEditComponent implements OnInit, OnDestroy {

  gSub: Subscription;
  mSub: Subscription;

  form: FormGroup;
  id: string;
  dbSysName: string;

  constructor(
    private referenceService: ReferenceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.gSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.referenceService.getById(params['id']);
      })
    ).subscribe((reference: Reference) => {
      console.log('reference', reference);
      this.id = reference.id;
      this.dbSysName = reference.sysname;
      this.form = new FormGroup({
        name: new FormControl(
          reference.name,
          [Validators.required]
        ),
        sysname: new FormControl(
          reference.sysname,
          [Validators.required, Validators.pattern('^[A-Za-z0-9][A-Za-z0-9\\_\\s]*$')]
        ),
        description: new FormControl(
          reference.description
        )
      });
    });
  }

  edit(): void {
    if (this.form.valid) {
      const editReference: Reference = {
        id: this.id,
        name: this.form.value.name,
        sysname: this.form.value.sysname,
        description: this.form.value.description
      };

      this.mSub = this.referenceService.modify(this.id, editReference)
        .subscribe(response => {
          console.log('Edit response', response);
        });

      this.goToReferencesPage();
    }
  }

  goToReferencesPage(): void {
    this.router.navigate(['/reference', 'references']);
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.mSub) {
      this.mSub.unsubscribe();
    }
  }
}
