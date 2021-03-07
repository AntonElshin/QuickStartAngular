import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {Reference} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';
import {ReferenceSysNameValidator} from '../../validators/reference.validator';


@Component({
  selector: 'app-reference',
  templateUrl: './reference-create.component.html',
  styleUrls: ['./reference-create.component.scss']
})
export class ReferenceCreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    private referenceService: ReferenceService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required]
      ),
      sysname: new FormControl(
        null,
        [Validators.required, Validators.pattern('^[A-Za-z0-9][A-Za-z0-9\\_\\s]*$')],
        [ReferenceSysNameValidator.bind(this.referenceService)]
      ),
      description: new FormControl(
        null
      )
    });

  }

  add(): void {

    if (this.form.valid) {
      const newReference: Reference = {
        name: this.form.value.name,
        sysname: this.form.value.sysname,
        description: this.form.value.description
      };

      this.referenceService.add(newReference)
        .subscribe(response => {
          console.log('Add response', response);
        });

      this.goToReferencesPage();
    }
    else {
      console.log('Форма не валидная!');
      console.log('form', this.form);
    }

  }

  goToReferencesPage(): void {
    this.router.navigate(['/references']);
  }

}
