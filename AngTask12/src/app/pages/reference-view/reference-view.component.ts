import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

import {Reference} from '../../interfaces/reference-interfaces';
import {ReferenceService} from '../../services/reference.service';
import {switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-reference-view',
  templateUrl: './reference-view.component.html',
  styleUrls: ['./reference-view.component.css']
})
export class ReferenceViewComponent implements OnInit, OnDestroy {

  gSub: Subscription;

  form: FormGroup;
  id: string;
  creationDate: Date;

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
      this.creationDate = reference.creationDate;
      console.log('creationDate', this.creationDate);
      this.form = new FormGroup({
        name: new FormControl(reference.name),
        sysname: new FormControl(reference.sysname),
        description: new FormControl(reference.description),
        author: new FormControl(reference.author),
        elementQuantity: new FormControl(reference.elementQuantity)
      });
    });
  }

  goToReferencesPage(): void {
    this.router.navigate(['/references']);
  }

  ngOnDestroy(): void {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }
  }

}
