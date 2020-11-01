import { Component, OnInit } from '@angular/core';
import { Associate } from '../../../_models/Associate'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  public AssociateList: Array<Associate>;
  public Associate: Associate = new Associate();
  ActionType = "Add Associate";
  page = 1;
  pageSize = 10;
  constructor(
    private apiservice: ApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    this.getAssociateList();
  }

  getAssociateList() {
    this.apiservice.getAssociates().subscribe(
      (response: any) => {
        this.AssociateList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }


  getAssociatelistItems() {
    if (this.AssociateList)
      if (this.AssociateList.length > this.pageSize) {
        return this.AssociateList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.AssociateList;
      }
  }

  AddAssociate() {
    this.apiservice.AddAssociate(this.Associate)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.notifier.notify("success", response.responseMsg);
            this.Associate = new Associate();
            this.getAssociateList();
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
        }
      });
  }

  getAssociate(ID) {
    this.apiservice.getAssociateByID(ID)
      .subscribe((response: Associate) => {
        if (response) {
          this.Associate = response;
        }
      });
  }

  EditAssociate(ID) {
    this.ActionType = "Edit Associate";
    this.Associate = new Associate();
    this.getAssociate(ID);
  }

  NewAssociate() {
    this.Associate = new Associate();
    this.ActionType = "Add Associate";
  }

  DeleteAssociate(ID) {
    this.apiservice.DeleteAssociateByID(ID)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.notifier.notify("success", response.responseMsg);
            this.Associate = new Associate();
            this.getAssociateList();
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
        }
      });
  }

}
