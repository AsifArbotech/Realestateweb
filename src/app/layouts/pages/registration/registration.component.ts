import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../_services/api.service';
import { Registration } from '../../../_models/registration';
import { Property } from '../../../_models/property';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public regListItems: Array<Registration>;
  public registrationItems: Registration=new Registration();
  public propertyListItems: Array<Property> = new Array<Property>();
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getRegistrations();
    this.getPropertyList();
  }

  getRegistrations() {
    this.apiservice.getRegistrations().subscribe(
      (response: any) => {
        this.regListItems = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  getRegistrationlistItems() {
    if (this.regListItems)
      if (this.regListItems.length > this.pageSize) {
        return this.regListItems.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.regListItems;
      }
  }

  SaveRegistration() {
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
    this.registrationItems.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
  else {
    alert("Please select Property form list");
    return;
  }
    this.registrationItems.regvalue = Number(this.registrationItems.regvalue);
    this.apiservice.AddRegistration(this.registrationItems)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
          }
          else {
            this.toastr.error('Something went wrong');
          }
          this.getRegistrations();
        }
      })
  }

  getPropertyList() {
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.propertyListItems = response
      },
      error => {
        console.log(error);
      }
    )
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
