import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/pages/login/login.component';
import { DashboardComponent } from './layouts/pages/dashboard/dashboard.component';
import { DepartmetComponent } from './layouts//pages/department/departmet.component';
import { UsersComponent } from './layouts/pages/users/users.component';
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
import { RegistrationComponent } from './layouts/pages/registration/registration.component';
import { InstallmentComponent } from './layouts/pages/installment/installment.component';
import { PaymentPayablesComponent } from './layouts/pages/Payments/paymentpayables/paymentpayables.component';
import { PaymentReceivablesComponent } from './layouts/pages/Payments/paymentreceivables/paymentreceivables.component';
import { AssociateTranComponent } from './layouts/pages/Transactions/associatetran/associatetran.component';
import { OwnerTransactionComponent } from './layouts/pages/Transactions/ownertransaction/ownertransaction.component';
import { CustomerTransactionComponent } from './layouts/pages/Transactions/customertransaction/customertransaction.component';
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
  { path: 'Owners', component: OwnersComponent, canActivate: [AuthGuard] },
  { path: 'Customers', component: CustomersComponent, canActivate: [AuthGuard] },
  { path: 'UnitAdd', component: PropertyAddComponent, canActivate: [AuthGuard]},
  { path: 'UnitEdit', component: PropertyEditComponent, canActivate: [AuthGuard]},
  { path: 'CreateBooking', component: CreatebookingComponent, canActivate: [AuthGuard]},
  { path: 'BookingCancellation', component: BookingcancellationComponent, canActivate: [AuthGuard]},
  { path: 'BookingTransfer', component: BookingtransferComponent, canActivate: [AuthGuard]},
  { path: 'AgreementCreate', component: ContractcreateComponent, canActivate: [AuthGuard]},
  { path: 'AgreementRenewal', component: ContractrenewalComponent, canActivate: [AuthGuard]},
  { path: 'AgreementTerminate', component: ContractterminateComponent, canActivate: [AuthGuard]},
  { path: 'SalesEnquire', component: SalesenquireComponent, canActivate: [AuthGuard]},
  { path: 'SalesInvoice', component: SalesinvoiceComponent, canActivate: [AuthGuard]},
  { path: 'SalesQuotation', component: SalesquotationComponent, canActivate: [AuthGuard]},
  { path: 'Pdc', component: PdcComponent, canActivate: [AuthGuard]},
  { path: 'Associate', component: AssociateComponent, canActivate: [AuthGuard]},
  { path: 'Dispute', component: DisputeComponent, canActivate: [AuthGuard]},
  { path: 'Installment', component: InstallmentComponent, canActivate: [AuthGuard]},
  { path: 'PaymentsPayables', component: PaymentPayablesComponent, canActivate: [AuthGuard]},
  { path: 'PaymentsReceivables', component: PaymentReceivablesComponent, canActivate: [AuthGuard]},
  { path: 'AssociateTransaction', component: AssociateTranComponent, canActivate: [AuthGuard]},
  { path: 'OwnerTransaction', component: OwnerTransactionComponent, canActivate: [AuthGuard]},
  { path: 'CustomerTransaction', component: CustomerTransactionComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [
      RouterModule
    ]
  })
export class RoutingModule { };
