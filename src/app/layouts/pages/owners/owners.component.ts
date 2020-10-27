import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Owner } from '../../../_models/owners'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  public ownersListItems: Array<Owner>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) {
                this.clearfields();
               }

  ngOnInit(): void {
    this.getOwnersList();
  }

  getOwnersList(){
    this.apiservice.getOwners().subscribe(
      (response:any)=>{
        this.ownersListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getOwnerslistItems() {
    if (this.ownersListItems.length > this.pageSize) {
      return this.ownersListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.ownersListItems;
    }
  }

  postowner(){
    var param = { OwnerName: this.model.ownername , OwnerReference: this.model.ownerreference , OwneraAdharno: this.model.owneraadharno, OwnerIdProof: this.model.owneridproof, Note: this.model.notes }
    this.apiservice.AddOwner(param)
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

 clearfields(){
  this.model = {
    ownername:"",
    ownerreference:"",
    addressid:"",
    owneraadharno:"",
    owneridproof:"",
    notes:"",
  }
 }

}
