import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import {ReferenceModule} from './modules/reference/reference.module';
import {SharedModule} from './modules/shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReferenceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
