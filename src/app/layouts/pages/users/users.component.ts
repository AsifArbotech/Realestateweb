import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../_services/api.service';
import { AddUser } from '../../../_models/user';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersListItems: Array<AddUser>;
  public usersItems: AddUser;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) {
                this.clearfields();
                this.usersListItems;
               }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.apiservice.getUsers().subscribe(
      (items:Array<AddUser>)=>{
        this.usersListItems=items
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getUsersItems() {
    if (this.usersListItems.length > this.pageSize) {
      return this.usersListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.usersListItems;
    }
  }

  getUser(id){
    this.apiservice.getUser(id).subscribe(
      (items:AddUser)=>{
        this.users=items
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  postUser(){
    var param = { Username: this.model.username, Password: this.model.password, Emailid: this.model.emailid, Mobile: this.model.mobileno }
    this.apiservice.AddUser(param)
      .subscribe((response:any)=>{
        if (response) {
          if(response.ResponseCode == 0){
            this.notifier.notify("error", response.ResponseMessage);
          }else if(response.ResponseCode == 1){
            this.notifier.notify("success", response.ResponseMessage);
            this.clearfields();
          }
        else{
            this.notifier.notify("error", "Something went wrong");
          }
        } 
      })
  }

  deleteUser(id,name){
    
    if (confirm("Do You wish to Delete the User - " + name + "?")){
      this.apiservice.DeleteUser(id)
      .subscribe((response:any)=>{
        if (response) {
          if(response.ResponseCode == 0){
            this.notifier.notify("error", response.ResponseMessage);
          }else if(response.ResponseCode == 1){
            this.notifier.notify("success", response.ResponseMessage);
      }
    }
    })
  }
}

updateUser(id){
  this.apiservice.EditUser(id)
      .subscribe((response:any)=>{
        this.usersListItems=response
        if (response) {
          if(response.ResponseCode == 0){
            this.notifier.notify("error", response.ResponseMessage);
          }else if(response.ResponseCode == 1){
            this.notifier.notify("success", response.ResponseMessage);
      }
    }
  })
}

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }

  clearfields(){
    this.model = {
      username:"",
      password:"",
      emailid:"",
      mobileno:""
    }
  }
}
