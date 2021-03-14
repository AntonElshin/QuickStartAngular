import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {ReferencesComponent} from './pages/references/references.component';
import { ReferenceCreateComponent } from './pages/reference-create/reference-create.component';
import { ReferenceEditComponent } from './pages/reference-edit/reference-edit.component';
import {MainLayoutComponent} from '../../layouts/main-layout/main-layout.component';
import {SharedModule} from '../shared/shared.module';
import {AuthGuard} from '../../auth.guard';

@NgModule({
  declarations: [
    ReferencesComponent,
    ReferenceCreateComponent,
    ReferenceEditComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: MainLayoutComponent, children: [
          {path: '', redirectTo: '/reference/references', pathMatch: 'full'},
          {path: 'references', component: ReferencesComponent, canActivate: [AuthGuard]},
          {path: 'create', component: ReferenceCreateComponent, canActivate: [AuthGuard]},
          {path: 'edit/:id', component: ReferenceEditComponent, canActivate: [AuthGuard]}
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class ReferenceModule { }
