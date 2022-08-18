import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TasklistComponent } from './all-tasks/tasklist/tasklist.component';
import { LoginComponent } from './login/login.component';
import { TaskPopupComponent } from './all-tasks/task-popup/task-popup.component';


@NgModule({
  declarations: [
    AppComponent,
    TasklistComponent,
    LoginComponent,
    TaskPopupComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AgGridModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
