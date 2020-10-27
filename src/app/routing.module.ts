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
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [
      RouterModule
    ]
  })
export class RoutingModule { };