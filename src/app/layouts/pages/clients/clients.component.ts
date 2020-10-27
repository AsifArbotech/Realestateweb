import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../_models/clients'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  public clientsListItems: Array<Client>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getClientsList();
  }

  getClientsList(){
    this.apiservice.getClients().subscribe(
      (response:any)=>{
        this.clientsListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getClientslistItems() {
    if (this.clientsListItems.length > this.pageSize) {
      return this.clientsListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.clientsListItems;
    }
  }

  getClient(id){
    this.apiservice.getClient(id).subscribe(
      (response:Array<Client>)=>{
        this.clientsListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  postclient(){
    var param = { ClientName: this.model.clientname , Clientreference: this.model.clientreference ,Agentreference: this.model.agentreference }
    this.apiservice.AddClient(param)
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

 updateDept(id){
  this.apiservice.EditClient(id)
      .subscribe((response:any)=>{
        this.clientsListItems=response
        if (response) {
          if(response.ResponseCode == 0){
            this.notifier.notify("error", response.ResponseMessage);
          }else if(response.ResponseCode == 1){
            this.notifier.notify("success", response.ResponseMessage);
      }
    }
    })
}

deleteDept( name){
  var param = { ClientID: this.model.clientid ,ClientName: this.model.clientname , Clientreference: this.model.clientreference ,Agentreference: this.model.agentreference }
  if (confirm("Do You wish to Delete the Department - " + name + "?")){
    this.apiservice.DeleteClient(param)
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

 
 clearfields(){
  this.model = {
    departmentname:"",
  }
 }

}
