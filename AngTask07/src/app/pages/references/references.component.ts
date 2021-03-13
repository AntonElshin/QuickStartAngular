import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {Reference} from '../../interfaces/reference-interfaces';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.css']
})
export class ReferencesComponent implements OnInit {

  form: FormGroup;

  references: Reference[] = [
    {id: 1, name: 'ref name 1', sysname: 'refsysname1', description: 'description 1'},
    {id: 2, name: 'ref name 2', sysname: 'refsysname2', description: 'description 2'},
    {id: 3, name: 'ref name 3', sysname: 'refsysname3', description: 'description 3'},
    {id: 4, name: 'ref name 4', sysname: 'refsysname4', description: 'description 4'},
    {id: 5, name: 'ref name 5', sysname: 'refsysname5', description: 'description 5'},
    {id: 6, name: 'ref name 6', sysname: 'refsysname6', description: 'description 6'},
    {id: 7, name: 'ref name 7', sysname: 'refsysname7', description: 'description 7'},
    {id: 8, name: 'ref name 8', sysname: 'refsysname8', description: 'description 8'},
    {id: 9, name: 'ref name 9', sysname: 'refsysname9', description: 'description 9'},
    {id: 10, name: 'ref name 10', sysname: 'refsysname10', description: 'description 10'},
    {id: 11, name: 'ref name 11', sysname: 'refsysname11', description: 'description 11'},
    {id: 12, name: 'ref name 12', sysname: 'refsysname12', description: 'description 12'},
    {id: 13, name: 'ref name 13', sysname: 'refsysname13', description: 'description 13'},
    {id: 14, name: 'ref name 14', sysname: 'refsysname14', description: 'description 14'},
    {id: 15, name: 'ref name 15', sysname: 'refsysname15', description: 'description 15'}
  ];

  constructor() {
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null),
      sysname: new FormControl(null)
    });
  }
}
