import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import ruLocale from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ReferenceInfoComponent } from './pages/reference-info/reference-info.component';


registerLocaleData(ruLocale, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    ReferencesComponent,
    ReferenceInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
