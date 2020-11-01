import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NotifierModule } from "angular-notifier";
import customNotifierOptions from './notifier.config';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
import { CreatebookingComponent } from './layouts/pages/createbooking/createbooking.component';
import { BookingcancellationComponent } from './layouts/pages/bookingcancellation/bookingcancellation.component';
import { BookingtransferComponent } from './layouts/pages/bookingtransfer/bookingtransfer.component';
import { ContractcreateComponent } from './layouts/pages/contractcreate/contractcreate.component';
import { ContractrenewalComponent } from './layouts/pages/contractrenewal/contractrenewal.component';
import { ContractterminateComponent } from './layouts/pages/contractterminate/contractterminate.component';
import { SalesenquireComponent } from './layouts/pages/salesenquire/salesenquire.component';
import { SalesinvoiceComponent } from './layouts/pages/salesinvoice/salesinvoice.component';
import { SalesquotationComponent } from './layouts/pages/salesquotation/salesquotation.component';
import { PdcComponent } from './layouts/pages/pdc/pdc.component';
import { AssociateComponent } from './layouts/pages/associate/associate.component';
import { RoutingModule } from './routing.module';
import { MatDatepickerModule, MatNativeDateModule,  MatInputModule} from '@angular/material';


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
    PropertyEditComponent,
    CreatebookingComponent,
    BookingcancellationComponent,
    BookingtransferComponent,
    ContractcreateComponent,
    ContractrenewalComponent,
    ContractterminateComponent,
    SalesenquireComponent,
    SalesinvoiceComponent,
    SalesquotationComponent,
    PdcComponent,
    AssociateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    NgbModal,
    MatDatepickerModule, 
    MatNativeDateModule,  
    MatInputModule

  ],
  providers: [
    AppConfig,
    AuthenticationService,
    ApiService,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
