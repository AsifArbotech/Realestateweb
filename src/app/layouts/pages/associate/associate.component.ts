import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Associate } from '../../../_models/Associate'
import { ApiService } from '../../../_services/api.service';
import { ToastrService } from 'ngx-toastr'

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
    private toastr: ToastrService,
    private modalService: NgbModal,
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
        this.toastr.error('Something went wrong');
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
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
            this.Associate = new Associate();
            this.getAssociateList();
          }
          else {
            this.toastr.error('Something went wrong');
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
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.toastr.success(response.responseMsg);
            this.Associate = new Associate();
            this.getAssociateList();
          }
          else {
            this.toastr.error('Something went wrong');
          }
        }
      });
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

}
