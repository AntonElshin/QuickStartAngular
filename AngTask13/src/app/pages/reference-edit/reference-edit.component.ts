import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Reference} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';
import {switchMap} from 'rxjs/operators';
import {ReferenceSysNameValidator} from '../../validators/reference.validator';

@Component({
  selector: 'app-reference-edit',
  templateUrl: './reference-edit.component.html',
  styleUrls: ['./reference-edit.component.css']
})
export class ReferenceEditComponent implements OnInit {

  form: FormGroup;
  id: string;
  dbSysName: string;

  constructor(
    private referenceService: ReferenceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.pipe(
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

      this.referenceService.modify(this.id, editReference)
        .subscribe(response => {
          console.log('Edit response', response);
        });

      this.goToReferencesPage();
    }
  }

  goToReferencesPage(): void {
    this.router.navigate(['/references']);
  }
}
