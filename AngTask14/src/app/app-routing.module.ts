import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'reference', loadChildren: () => import('./modules/reference/reference.module').then(m => m.ReferenceModule)
  },
  {
    path: '', component: AppComponent, children: [
      {path: '', redirectTo: '/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'error', component: ErrorPageComponent},
      {path: '**', redirectTo: '/error'}
    ],
    runGuardsAndResolvers: 'always'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
