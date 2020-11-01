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

  getUsers(){
    return this.http.get(this.BASEURL+ '/Users/GetAllUsers', this.getAuthHeadersJSON());
  }

  getUser(id){
    return this.http.get(this.BASEURL+ '/Users/GetUsersbyID?ID=' + id, this.getAuthHeadersJSON());
  }

  AddUser(data:any){
    return this.http.post(this.BASEURL+'/Users/AddUser',data,this.getAuthHeadersJSON());
  }

  DeleteUser(id:any){
    return this.http.get(this.BASEURL+'/Users/DeleteUser?ID='+id ,this.getAuthHeadersJSON());
  }

  EditUser(id){
    return this.http.post(this.BASEURL+'/Users/EditUser',id,this.getAuthHeadersJSON());
  }

  getDepartments(){
    return this.http.get(this.BASEURL+ '/Departments/GetAllDepartment', this.getAuthHeadersJSON());
  }

  getDepartment(id){
    return this.http.get(this.BASEURL+ '/Departments/GetAllDepartment?ID=' + id, this.getAuthHeadersJSON());
  }

  AddDepartment(data:any){
    return this.http.post(this.BASEURL+'/Departments/AddDepartment',data,this.getAuthHeadersJSON());
  }

  DeleteDepartment(id){
    return this.http.get(this.BASEURL+'/Departments/DeleteDepartment?ID='+id,this.getAuthHeadersJSON());
  }

  EditDept(id){
    return this.http.post(this.BASEURL+'/Departments/EditDepartment',id,this.getAuthHeadersJSON());
  }

  getRoles(){
    return this.http.get(this.BASEURL+ '/Roles/GetAllRoles', this.getAuthHeadersJSON());
  }

  AddRole(data:any){
    return this.http.post(this.BASEURL+'/Roles/AddRole',data,this.getAuthHeadersJSON());
  }

  DeleteRole(id){
    return this.http.get(this.BASEURL+'/Roles/DeleteRoles?ID='+ id,this.getAuthHeadersJSON());
  }

  getClients(){
    return this.http.get(this.BASEURL+ '/Client/GetAllClient', this.getAuthHeadersJSON());
  }

  AddClient(data){
    return this.http.post(this.BASEURL+'/Client/AddClient',data,this.getAuthHeadersJSON());
  }

  EditClient(id){
    return this.http.post(this.BASEURL+'/Client/EditClient',id,this.getAuthHeadersJSON());
  }

  DeleteClient(id){
    return this.http.post(this.BASEURL+'/Client/DeleteClient?ID='+id , this.getAuthHeadersJSON());
  }

  getClient(id){
    return this.http.get(this.BASEURL+ '/Client/GetAllClient?ID=' + id, this.getAuthHeadersJSON());
  }

  getProjects(){
    return this.http.get(this.BASEURL+ '/Project/GetAllProject', this.getAuthHeadersJSON());
  }

  AddProject(data){
    return this.http.post(this.BASEURL+'/Project/AddProject',data,this.getAuthHeadersJSON());
  }

  getProject(id){
    return this.http.get(this.BASEURL+ '/Project/GetProjectByID?ID=' + id, this.getAuthHeadersJSON());
  }

  EditProject(data){
    return this.http.post(this.BASEURL+'/Project/EditProject',data,this.getAuthHeadersJSON());
  }

  DeleteProject(id){
    return this.http.get(this.BASEURL+ '/Project/DeleteProject?ID=' + id, this.getAuthHeadersJSON());
  }

  getProperties(){
    return this.http.get(this.BASEURL+ '/Property/GetAllProperty', this.getAuthHeadersJSON());
  }

  getProperty(id){
    return this.http.get(this.BASEURL+ '/Property/GetPropertyByID?ID=' + id, this.getAuthHeadersJSON());
  }

  EditProperty(data){
    return this.http.post(this.BASEURL+'/Property/EditProperty',data,this.getAuthHeadersJSON());
  }

  AddProperty(data){
    return this.http.post(this.BASEURL+'/Property/AddProperty',data,this.getAuthHeadersJSON());
  }

  DeleteProperty(id){
    return this.http.get(this.BASEURL+ '/Property/DeleteProperty?ID=' + id, this.getAuthHeadersJSON());
  }

  getOwners(){
    return this.http.get(this.BASEURL+ '/Owners/GetAllOwners', this.getAuthHeadersJSON());
  }

  getOwner(id){
    return this.http.get(this.BASEURL+ '/Owners/GetOwnersByID?ID=' + id, this.getAuthHeadersJSON());
  }

  AddOwner(data){
    return this.http.post(this.BASEURL + '/Owners/AddOwner', data ,this.getAuthHeadersJSON());
  }

  EditOwner(data){
    return this.http.post(this.BASEURL+'/Owners/EditOwners',data,this.getAuthHeadersJSON());
  }

  DeleteOwner(id){
    return this.http.get(this.BASEURL+ '/Owners/DeleteOwners?ID=' + id, this.getAuthHeadersJSON());
  }

  AddSalesQuot(data){
    return this.http.post(this.BASEURL + '/SalesQuotation/AddSalesQuotation', data ,this.getAuthHeadersJSON());
  }
}
