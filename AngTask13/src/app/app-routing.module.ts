import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReferencesComponent} from './pages/references/references.component';
import {ReferenceCreateComponent} from './pages/reference-create/reference-create.component';
import {ReferenceEditComponent} from './pages/reference-edit/reference-edit.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: '/references', pathMatch: 'full'},
      {path: 'references', component: ReferencesComponent},
      {path: 'reference-create', component: ReferenceCreateComponent},
      {path: 'reference-edit/:id', component: ReferenceEditComponent}
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
