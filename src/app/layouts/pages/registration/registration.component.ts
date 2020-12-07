import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../_services/api.service';
import { Registration } from '../../../_models/registration';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public regListItems: Array<Registration>;
  public registrationItems: Registration=new Registration();
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private notifier: NotifierService,) { }

  ngOnInit(): void {
    this.getRegistrations();
  }

  getRegistrations() {
    this.apiservice.getRegistrations().subscribe(
      (response: any) => {
        this.regListItems = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
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
    this.registrationItems.regdocno = Number(this.registrationItems.regdocno);
    this.registrationItems.regvalue = Number(this.registrationItems.regvalue);
    this.apiservice.AddRegistration(this.registrationItems)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.notifier.notify("success", response.responseMsg);
            this.getRegistrations();
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
        }
      })
  }

}
