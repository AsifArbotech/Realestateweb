import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { AppConfig } from '../app.config'
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable()

export class ApiService {

  private BASEURL: any = '';
  public error: any;

  public headers: Headers;

  constructor(public http: HttpClient, private config: AppConfig, private authService: AuthenticationService) {
    this.BASEURL = this.config.BaseUrl;
    this.http = http;
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.access_token) {
      this.headers.append('Authorization', 'Bearer ' + currentUser.token);
    }
  }

  getAuthHeaders() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {
      return { headers: { 'Authorization': 'Bearer ' + currentUser.access_token } };

    }
  }

  getAuthHeadersJSON() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {

      return { headers: { 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': 'application/json' } };

    }
  }

  getHeadersJSON() {
    return { headers: { 'Content-Type': 'application/json' } }
  }

  getUsers() {
    return this.http.get(this.BASEURL + '/Users/GetAllUsers', this.getAuthHeadersJSON());
  }

  getUser(id) {
    return this.http.get(this.BASEURL + '/Users/GetUsersbyID?ID=' + id, this.getAuthHeadersJSON());
  }

  AddUser(data: any) {
    return this.http.post(this.BASEURL + '/Users/AddUser', data, this.getAuthHeadersJSON());
  }

  DeleteUser(id: any) {
    return this.http.get(this.BASEURL + '/Users/DeleteUser?ID=' + id, this.getAuthHeadersJSON());
  }

  EditUser(id) {
    return this.http.post(this.BASEURL + '/Users/EditUser', id, this.getAuthHeadersJSON());
  }

  getDepartments() {
    return this.http.get(this.BASEURL + '/Departments/GetAllDepartment', this.getAuthHeadersJSON());
  }

  getDepartment(id) {
    return this.http.get(this.BASEURL + '/Departments/GetAllDepartment?ID=' + id, this.getAuthHeadersJSON());
  }

  AddDepartment(data: any) {
    return this.http.post(this.BASEURL + '/Departments/AddDepartment', data, this.getAuthHeadersJSON());
  }

  DeleteDepartment(id) {
    return this.http.get(this.BASEURL + '/Departments/DeleteDepartment?ID=' + id, this.getAuthHeadersJSON());
  }

  EditDept(id) {
    return this.http.post(this.BASEURL + '/Departments/EditDepartment', id, this.getAuthHeadersJSON());
  }

  getRoles() {
    return this.http.get(this.BASEURL + '/Roles/GetAllRoles', this.getAuthHeadersJSON());
  }

  AddRole(data: any) {
    return this.http.post(this.BASEURL + '/Roles/AddRole', data, this.getAuthHeadersJSON());
  }

  DeleteRole(id) {
    return this.http.get(this.BASEURL + '/Roles/DeleteRoles?ID=' + id, this.getAuthHeadersJSON());
  }

  getCustomers() {
    return this.http.get(this.BASEURL + '/Customer/GetAllCustomer', this.getAuthHeadersJSON());
  }

  AddCustomers(data) {
    if (data.id) {
      return this.http.post(this.BASEURL + '/Customer/EditCustomer', data, this.getAuthHeadersJSON());
    }
    return this.http.post(this.BASEURL + '/Customer/AddCustomer', data, this.getAuthHeadersJSON());
  }

  //EditCCustomers(id) {
  //  return this.http.post(this.BASEURL + '/Client/EditClient', id, this.getAuthHeadersJSON());
  //}

  DeleteCustomers(id) {
    return this.http.post(this.BASEURL + '/Customer/DeleteCustomer?ID=' + id, this.getAuthHeadersJSON());
  }

  getCustomer(id) {
    return this.http.get(this.BASEURL + '/Customer/GetCustomerById?ID=' + id, this.getAuthHeadersJSON());
  }

  getProjects() {
    return this.http.get(this.BASEURL + '/Project/GetAllProject', this.getAuthHeadersJSON());
  }

  AddProject(data) {
    return this.http.post(this.BASEURL + '/Project/AddProject', data, this.getAuthHeadersJSON());
  }

  getProject(id) {
    return this.http.get(this.BASEURL + '/Project/GetProjectByID?ID=' + id, this.getAuthHeadersJSON());
  }

  DeleteProject(id) {
    return this.http.get(this.BASEURL + '/Project/DeleteProject?ID=' + id, this.getAuthHeadersJSON());
  }

  getProperties() {
    return this.http.get(this.BASEURL + '/Property/GetAllProperty', this.getAuthHeadersJSON());
  }

  AddProperty(data) {
    return this.http.post(this.BASEURL + '/Property/AddProperty', data, this.getAuthHeadersJSON());
  }

  DeleteProperty(id) {
    return this.http.get(this.BASEURL + '/Property/DeleteProperty?ID=' + id, this.getAuthHeadersJSON());
  }

  getOwners() {
    return this.http.get(this.BASEURL + '/Owners/GetAllOwners', this.getAuthHeadersJSON());
  }

  AddOwner(data) {
    return this.http.post(this.BASEURL + '/Owners/AddOwner', data, this.getAuthHeadersJSON());
  }

  //Add Consultant or Associate
  AddAssociate(associate) {
    if (associate.id) {
      return this.http.post(this.BASEURL + '/Consultant/EditConsultant', associate, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/Consultant/AddConsultant', associate, this.getAuthHeadersJSON());
  }

  getAssociates() {
    return this.http.get(this.BASEURL + '/Consultant/GetAllConsultant', this.getAuthHeadersJSON());
  }

  getAssociateByID(ID) {
    return this.http.get(this.BASEURL + '/Consultant/GetConsultantById?ID=' + ID, this.getAuthHeadersJSON());
  }

  DeleteAssociateByID(ID) {
    return this.http.get(this.BASEURL + '/Consultant/DeleteConsultant?ID=' + ID, this.getAuthHeadersJSON());
  }


  //  Sales Enquire Services
  AddSalesEnquire(Enquire) {
    if (Enquire.id) {
      return this.http.post(this.BASEURL + '/SalesEnquire/EditSalesEnquire', Enquire, this.getAuthHeadersJSON());
    }
    else
      return this.http.post(this.BASEURL + '/SalesEnquire/AddSalesEnquire', Enquire, this.getAuthHeadersJSON());
  }

  getSalesEnquireList() {
    return this.http.get(this.BASEURL + '/SalesEnquire/GetAllSalesEnquire', this.getAuthHeadersJSON());
  }

  getSalesEnquireByID(ID) {
    return this.http.get(this.BASEURL + '/SalesEnquire/GetSalesEnquireById?ID=' + ID, this.getAuthHeadersJSON());
  }

  DeleteSalesEnquireByID(ID) {
    return this.http.get(this.BASEURL + '/SalesEnquire/DeleteSalesEnquire?ID=' + ID, this.getAuthHeadersJSON());
  }

}
