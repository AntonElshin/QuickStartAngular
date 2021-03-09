import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Reference} from '../../interfaces/reference-interfaces';

@Component({
  selector: 'app-reference-info',
  templateUrl: './reference-info.component.html',
  styleUrls: ['./reference-info.component.css']
})
export class ReferenceInfoComponent implements OnInit {

  form: FormGroup;

  @Input() reference: Reference;

  constructor() { }

  ngOnInit(): void {

    this.form = new FormGroup({
      author: new FormControl(this.reference != null ? this.reference.author : ''),
      creationDate: new FormControl(this.reference != null ? this.reference.creationDate : ''),
      elementQuantity: new FormControl(this.reference != null ? this.reference.elementQuantity : '')
    });
  }

}
