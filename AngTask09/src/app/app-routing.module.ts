import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ReferencesComponent} from './pages/references/references.component';
import {AppComponent} from './app.component';

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: '/references', pathMatch: 'full'},
      {path: 'references', component: ReferencesComponent}
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
