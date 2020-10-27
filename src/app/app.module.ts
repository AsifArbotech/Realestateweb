import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";
import { FormsModule } from '@angular/forms';
//import customNotifierOptions from './notifier.config';

import { AuthenticationService } from './_services/authentication.service';
import { ApiService } from './_services/api.service';
import { AppConfig } from './app.config';
import { AuthGuard } from './_services/auth-guard.service'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/pages/login/login.component';
import { DashboardComponent } from './layouts/pages/dashboard/dashboard.component';
import { DepartmetComponent } from './layouts/pages/department/departmet.component';
import { UsersComponent } from './layouts/pages/users/users.component';
import { HeaderComponent } from './layouts/common/header/header.component';
import { RolesComponent } from './layouts/pages/roles/roles.component';
import { ClientsComponent } from './layouts/pages/clients/clients.component';
import { OwnersComponent } from './layouts/pages/owners/owners.component';
import { ProjectsComponent } from './layouts/pages/projects/projects.component';
import { PropertyComponent } from './layouts/pages/property/property.component';
import { PropertyAddComponent } from './layouts/pages/property-add/property-add.component';
import { PropertyEditComponent } from './layouts/pages/property-edit/property-edit.component';
import { RoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DepartmetComponent,
    UsersComponent,
    HeaderComponent,
    RolesComponent,
    ClientsComponent,
    OwnersComponent,
    ProjectsComponent,
    PropertyComponent,
    PropertyAddComponent,
    PropertyEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule,
    HttpClientModule,
    NotifierModule,
    FormsModule,
  ],
  providers: [
    AppConfig,
    AuthenticationService,
    ApiService,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
