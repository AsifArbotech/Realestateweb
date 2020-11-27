import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';
import { Customers } from '../../../../_models/Customers';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { PaymentRec , Payment } from '../../../../_models/payments';

@Component({
  selector: 'app-paymentreceivables',
  templateUrl: './paymentreceivables.component.html',
  styleUrls: ['./paymentreceivables.component.css']
})
export class PaymentReceivablesComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public projectsListItems: Array<Project> = new Array<Project>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public PaymentsList: Array<Payment> = new Array<Payment>();
  addPaymentRec: PaymentRec = new PaymentRec();

  page = 1;
  pageSize = 10;
  projectname: String = '';
  unit: String = '';
  customername: String = '';

  constructor(private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
      this.getPaymentRecList();
      this.getCustomerslist();
      this.getProjectsList();
      this.getPropertyList();
  }

  getPaymentRecList() {
    this.apiservice.getPaymentRec().subscribe(
      (response: any) => {
        this.PaymentsList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getPaymentReclistItems() {
    if (this.PaymentsList)
      if (this.PaymentsList.length > this.pageSize) {
        return this.PaymentsList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.PaymentsList;
      }
  }

  SavePaymentRec() {
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.addPaymentRec.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }
      

    if ((<HTMLInputElement>document.getElementById('Customerid')).value)
      this.addPaymentRec.customerid = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('Customerid')).value).id;
    else {
      alert("Please select Customer form list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addPaymentRec.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }
    this.addPaymentRec.amount = Number(this.addPaymentRec.amount);
    this.addPaymentRec.totalamount = Number(this.addPaymentRec.totalamount);
    this.addPaymentRec.paymentrefno = Number(this.addPaymentRec.paymentrefno);
    this.apiservice.AddPaymentRec(this.addPaymentRec)
    .subscribe((response: any) => {
      if (response) {
        if (response.responseCode == 0) {
          this.notifier.notify("error", response.responseMsg);
        } else if (response.responseCode == 1) {
          this.notifier.notify("success", response.responseMsg);
        }
        else {
          this.notifier.notify("error", "Something went wrong");
        }
        this.clearfields();
        this.getPaymentRecList();
      }
    })
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

  getProjectsList() {
    this.apiservice.getProjects().subscribe(
      (response: any) => {
        this.projectsListItems = response
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
    (<HTMLInputElement>document.getElementById('Projectid')).value = "";
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.addPaymentRec = new PaymentRec();
  }
}
