import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Owner } from '../../../_models/owners'
import { ApiService } from '../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {

  public ownersListItems: Array<Owner>;
  public ownerItems: Owner=new Owner();
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private toastr: ToastrService,
              private modalService: NgbModal) {
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
        this.toastr.error('Something went wrong');          
      }
    )
  }

  getOwnerslistItems() {
    if (this.ownersListItems)
    if (this.ownersListItems.length > this.pageSize) {
      return this.ownersListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.ownersListItems;
    }
  }

  getOwner(id) {
    this.apiservice.getOwner(id).subscribe(
      (response: any) => {
        this.ownerItems = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');  
      }
    )
  }

  postowner(){
    var param = { OwnerName: this.model.ownername , OwnerReference: this.model.ownerreference , OwneraAdharno: this.model.owneraadharno, OwnerIdProof: this.model.owneridproof, Note: this.model.notes }
    this.apiservice.AddOwner(param)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.toastr.error(response.responseMsg);
        }else if(response.ResponseCode == 1){
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
          this.clearfields();
          this.getOwnersList();
        }
      else{
        this.toastr.error('Something went wrong');  
        }
        this.getOwnersList();
      } 
   })
 }

 updateOwner() {
  this.apiservice.EditOwner(this.ownerItems)
    .subscribe((response: any) => {
      this.ownerItems = response
      if (response) {
        if (response.responseCode == 0) {
          this.toastr.error(response.responseMsg);
        } else if (response.responseCode == 1) {
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
          this.getOwnersList();
        }
      }
    })
}

 deleteOwner(id, name) {
  if (confirm("Do You wish to Delete the Owner - " + name + "?")) {
    this.apiservice.DeleteOwner(id)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.toastr.success(response.responseMsg);
            this.getOwnersList();
          }
        }
      })
  }
}

 openModal(editUserModel) {
  this.modalService.open(editUserModel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  }, (reason) => {
  });
};

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
