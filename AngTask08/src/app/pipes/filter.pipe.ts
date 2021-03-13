import { Pipe, PipeTransform } from '@angular/core';
import {Reference} from '../interfaces/reference-interfaces';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(references: Reference[], searchName: string = '', searchSysname: string = ''): Reference[] {
    if (!searchName.trim() && !searchSysname.trim()) {
      return references;
    }

    if (searchName !== undefined && searchSysname !== undefined) {
      return references.filter(s => s.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1 && s.sysname.toLowerCase().indexOf(searchSysname.toLowerCase()) !== -1);
    }
    else if (searchName === undefined && searchSysname !== undefined) {
      return references.filter(s => s.sysname.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
    else if (searchName !== undefined && searchSysname === undefined) {
      return references.filter(s => s.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    }
    else {
      return references;
    }
  }

}
