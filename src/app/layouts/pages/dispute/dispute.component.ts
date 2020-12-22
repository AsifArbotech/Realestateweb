import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../_services/api.service';
import { Dispute } from '../../../_models/dispute'
import { ToastrService } from 'ngx-toastr';
import { Property } from '../../../_models/property';

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.css']
})
export class DisputeComponent implements OnInit {
  public propertyListItems: Array<Property> = new Array<Property>();
  public DisputeList: Array<Dispute> = new Array<Dispute>();
  Dispute : Dispute = new Dispute();

  ActionType = "Add Dispute";
  page = 1;
  pageSize = 10;
  unit: String = '';

  constructor(private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDisputeList();
    this.getPropertyList();
  }

  getDisputeList(){
    this.apiservice.getDisputeList().subscribe(
      (response: any) => {
        this.DisputeList = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  getDisputelisttItems() {
    if (this.DisputeList)
      if (this.DisputeList.length > this.pageSize) {
        return this.DisputeList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.DisputeList;
      }
  }

  SaveDispute() {
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.Dispute.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }
    this.Dispute.status = Number(this.Dispute.status);
    this.apiservice.AddDispute(this.Dispute)
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
        this.clearfields();
        this.getDisputeList();
      }
    })
  }

  EditDispute(id) {
    this.ActionType = "Edit Dispute";
    this.GetAllSuggesstion();
    this.apiservice.getDisputeByID(id).subscribe(
      (response: Dispute) => {
       //response.date = new Date(response.date.toString().split('T')[0]);
       // response.createdon =response.createdon;
        this.Dispute = response;
        (<HTMLInputElement>document.getElementById('Propertyid')).value = this.propertyListItems.find(f => f.id == this.Dispute.unitid).plotno;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )

    this.ActionType = "Edit Dispute";
  }

  DeleteDispute(id) {
    if (confirm("Do You wish to Delete the Dispute?")) {
      this.apiservice.DeleteDispute(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.modalService.dismissAll();
              this.toastr.success(response.responseMsg);
              this.getDisputeList();
            }
          }
        })
    }
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

  clearfields() {
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.Dispute = new Dispute();
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Dispute";
    if (this.propertyListItems.length == 0)
      this.getPropertyList();
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
