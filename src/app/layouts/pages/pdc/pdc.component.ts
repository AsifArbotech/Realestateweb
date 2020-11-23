import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { Pdc } from '../../../_models/Pdc'
import { NotifierService } from 'angular-notifier';
import { Customers } from '../../../_models/Customers';
import { Property } from '../../../_models/property';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pdc',
  templateUrl: './pdc.component.html',
  styleUrls: ['./pdc.component.css']
})

export class PdcComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public PdcList: Array<Pdc> = new Array<Pdc>();
  pdc : Pdc = new Pdc();

  ActionType = "Add Pdc";
  page = 1;
  pageSize = 10;
  unit: String = '';
  customername: String = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPdcList();
    this.getCustomerslist();
    this.getPropertyList();
  }

  getPdcList(){
    debugger;
    this.apiservice.getPdcList().subscribe(
      (response: any) => {
        this.PdcList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getPdclisttItems() {
    if (this.PdcList)
      if (this.PdcList.length > this.pageSize) {
        return this.PdcList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.PdcList;
      }
  }

  SavePdc() {
    if ((<HTMLInputElement>document.getElementById('Customerid')).value)
      this.pdc.CUSTOMERID = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('Customerid')).value).id;
    else {
      alert("Please select Customer form list");
      return;
    }
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.pdc.UNITID = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }
    this.pdc.CHEQUENO = this.pdc.CHEQUENO;
    this.apiservice.AddPdc(this.pdc)
    .subscribe((response: any) => {
      if (response) {
        if (response.responseCode == 0) {
          this.notifier.notify("error", response.responseMsg);
        } else if (response.responseCode == 1) {
          this.notifier.notify("success", response.responseMsg);
          this.modalService.dismissAll();
        }
        else {
          this.notifier.notify("error", "Something went wrong");
        }
        this.clearfields();
        this.getPdcList();
      }
    })
  }

  EditPdc(id) {
    this.ActionType = "Edit Pdc";
    this.GetAllSuggesstion();
    this.apiservice.getPdcByID(id).subscribe(
      (response:any) => {
       // response.createdon = new Date(response.createdon.toString().split('T')[0]);
        response.CREATEDON =response.createdon;
        this.pdc = response;

        (<HTMLInputElement>document.getElementById('Customerid')).value = response.customername;
        (<HTMLInputElement>document.getElementById('Propertyid')).value = response.plotno;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )

    this.ActionType = "Edit Pdc";
  }

  DeletePdc(id) {
    if (confirm("Do You wish to Delete the Pdc?")) {
      this.apiservice.DeletePdc(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getPdcList();
            }
          }
        })
    }
  }

  getCustomerslist() {
    this.apiservice.getCustomers().subscribe(
      (response: any) => {
        this.customerslist = response
      },
      error => {
        console.log(error);

      }
    )
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
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.pdc = new Pdc();
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Pdc";
    if (this.customerslist.length == 0)
      this.getCustomerslist();
    if (this.propertyListItems.length == 0)
      this.getPropertyList();
  }
}
