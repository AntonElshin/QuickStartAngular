import {FormControl} from '@angular/forms';
import {map} from 'rxjs/operators';

export function ReferenceSysNameValidator(control: FormControl): {[key: string]: boolean} {
  return this.validateSysname(control.value).pipe(
    map((response) => {
      return response ? { notUniqueSysName: true } : null;
    })
  );
}
