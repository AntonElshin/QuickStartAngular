import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ReferenceCreateComponent } from './pages/reference-create/reference-create.component';
import { ReferenceEditComponent } from './pages/reference-edit/reference-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ReferencesComponent,
    ReferenceCreateComponent,
    ReferenceEditComponent
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
