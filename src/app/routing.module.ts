import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/pages/login/login.component';
import { DashboardComponent } from './layouts/pages/dashboard/dashboard.component';
import { DepartmetComponent } from './layouts//pages/department/departmet.component';
import { UsersComponent } from './layouts/pages/users/users.component';
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
import { PdcComponent } from './layouts/pages/pdc/pdc.component';
import { SalesquotationComponent } from './layouts/pages/salesquotation/salesquotation.component';
import { AssociateComponent } from './layouts/pages/associate/associate.component';
import { AuthGuard } from './_services/auth-guard.service';
import { GuestGuard } from './_services/guset-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'Users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'Departments', component: DepartmetComponent, canActivate: [AuthGuard]},
  { path: 'Roles', component: RolesComponent, canActivate: [AuthGuard]},
  { path: 'Project', component: ProjectsComponent, canActivate: [AuthGuard]},
  { path: 'Property', component: PropertyComponent, canActivate: [AuthGuard]},
  { path: 'Owners', component: OwnersComponent, canActivate: [AuthGuard]},
  { path: 'Clients', component: ClientsComponent, canActivate: [AuthGuard]},
  { path: 'UnitAdd', component: PropertyAddComponent, canActivate: [AuthGuard]},
  { path: 'UnitEdit', component: PropertyEditComponent, canActivate: [AuthGuard]},
  { path: 'CreateBooking', component: CreatebookingComponent, canActivate: [AuthGuard]},
  { path: 'BookingCancellation', component: BookingcancellationComponent, canActivate: [AuthGuard]},
  { path: 'BookingTransfer', component: BookingtransferComponent, canActivate: [AuthGuard]},
  { path: 'ContractCreate', component: ContractcreateComponent, canActivate: [AuthGuard]},
  { path: 'ContractRenewal', component: ContractrenewalComponent, canActivate: [AuthGuard]},
  { path: 'ContractTerminate', component: ContractterminateComponent, canActivate: [AuthGuard]},
  { path: 'SalesEnquire', component: SalesenquireComponent, canActivate: [AuthGuard]},
  { path: 'SalesInvoice', component: SalesinvoiceComponent, canActivate: [AuthGuard]},
  { path: 'SalesQuotation', component: SalesquotationComponent, canActivate: [AuthGuard]},
  { path: 'Pdc', component: PdcComponent, canActivate: [AuthGuard]},
  { path: 'Associate', component: AssociateComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [
      RouterModule
    ]
  })
export class RoutingModule { };