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
import { CustomersComponent } from './layouts/pages/customers/customers.component';
import { OwnersComponent } from './layouts/pages/owners/owners.component';
import { ProjectsComponent } from './layouts/pages/projects/projects.component';
import { PropertyComponent } from './layouts/pages/Property/property/property.component';
import { PropertyAddComponent } from './layouts/pages/Property/property-add/property-add.component';
import { PropertyEditComponent } from './layouts/pages/Property/property-edit/property-edit.component';
import { CreatebookingComponent } from './layouts/pages/Booking/createbooking/createbooking.component';
import { BookingcancellationComponent } from './layouts/pages/Booking/bookingcancellation/bookingcancellation.component';
import { BookingtransferComponent } from './layouts/pages/Booking/bookingtransfer/bookingtransfer.component';
import { ContractcreateComponent } from './layouts/pages/Contract/contractcreate/contractcreate.component';
import { ContractrenewalComponent } from './layouts/pages/Contract/contractrenewal/contractrenewal.component';
import { ContractterminateComponent } from './layouts/pages/Contract/contractterminate/contractterminate.component';
import { SalesenquireComponent } from './layouts/pages/Sales/salesenquire/salesenquire.component';
import { SalesinvoiceComponent } from './layouts/pages/Sales/salesinvoice/salesinvoice.component';
import { SalesquotationComponent } from './layouts/pages/Sales/salesquotation/salesquotation.component';
import { PdcComponent } from './layouts/pages/pdc/pdc.component';
import { AssociateComponent } from './layouts/pages/associate/associate.component';
import { DisputeComponent } from './layouts/pages/dispute/dispute.component';
import { PaymentComponent } from './layouts/pages/payment/payment.component';
import { RegistrationComponent } from './layouts/pages/registration/registration.component';
import { InstallmentComponent } from './layouts/pages/installment/installment.component';
import { RoutingModule } from './routing.module';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, DashboardComponent, DepartmetComponent, UsersComponent, HeaderComponent, RolesComponent,
    CustomersComponent, OwnersComponent, ProjectsComponent, PropertyComponent, PropertyAddComponent, PropertyEditComponent,
    CreatebookingComponent, BookingcancellationComponent, BookingtransferComponent, ContractcreateComponent,
    ContractrenewalComponent, ContractterminateComponent, SalesenquireComponent, SalesinvoiceComponent, SalesquotationComponent,
    PdcComponent, AssociateComponent, DisputeComponent, PaymentComponent, RegistrationComponent, InstallmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RoutingModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),
    FormsModule,
    //NgbModal,
  ],
  providers: [
    AppConfig,
    AuthenticationService,
    ApiService,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
