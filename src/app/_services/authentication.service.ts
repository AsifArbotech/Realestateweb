import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from '../_models/user';

@Injectable()

export class AuthenticationService {
  public user: User;
  model: any = {};
  headers

  constructor(private http: HttpClient, private config: AppConfig) {}

  login(username:string, password:string){
    var obj:any={
      "username":username,
      "password":password
    }
    var body="username=" + username + "&password=" + password + "&grant_type=" + "password";

    return this.http.post(this.config.BaseUrl + '/Users/Login', obj, this.getHeaders())
    
  //  this.headers={
  //    headers: new HttpHeaders({
  //        'Content-Type': 'application/json',
  //    })
  //});
  }


  getUser(): User{
    return JSON.parse(localStorage.getItem('currentUser')) || false;
  }

  //isAdvisor() : boolean{
  //  return  this.getUser().RoleId == 98;;
  //}

  //isUser(): boolean{
  //  return this.getUser().RoleId == 97;
  //  ;
  //}

  isLoggedIn(){
    if(this.getUser()){
      return true;
    }else{
      return false;
    }
  }

  getHeaders() {
    return{headers : { 'Content-Type': 'application/json' }}
    //return{headers : { 'Content-Type': 'application/x-www-form-urlencoded' }};

  }

  getAuthHeadersJSON() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.access_token) {

      return {headers: { 'Authorization': 'Bearer ' + currentUser.access_token, 'Content-Type': 'application/json' }}

    }
  }

  
  logout(real = false) {
    // remove user from local storage to log user out
    if (real) {
      this.http.get(this.config.BaseUrl + '', this.getAuthHeadersJSON()).subscribe()
    }
    localStorage.removeItem('currentUser');
  }
}
