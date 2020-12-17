import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';
import { Customers } from '../../../../_models/Customers';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { Owner } from '../../../../_models/owners';
import { Associate } from '../../../../_models/Associate';
import { Payment , PaymentPay } from '../../../../_models/payments';

@Component({
  selector: 'app-paymentpayables',
  templateUrl: './paymentpayables.component.html',
  styleUrls: ['./paymentpayables.component.css']
})
export class PaymentPayablesComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public projectsListItems: Array<Project> = new Array<Project>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public AssociateList: Array<Associate> = new Array<Associate>();
  public ownerListItems: Array<Owner> = new Array<Owner>();
  public PaymentsList: Array<Payment> = new Array<Payment>();
  addPaymentPay: PaymentPay = new PaymentPay();

  page = 1;
  pageSize = 10;
  projectname: String = '';
  unit: String = '';
  owner: string = '';
  associatename: String = '';

  isShowTextField = false;
  constructor(private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getCustomerslist();
    this.getProjectsList();
    this.getPropertyList();
    this.getOwnerList();
    this.getAssociateList();
    this.getPaymentPayList();
  }

  getPaymentPayList() {
    this.apiservice.getPaymentPay().subscribe(
      (response: any) => {
        this.PaymentsList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getPaymentPaylistItems() {
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

  SavePaymentPay() {
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.addPaymentPay.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }

      if(this.isSelected == null){
    if ((<HTMLInputElement>document.getElementById('Ownerid')).value)
      this.addPaymentPay.ownerid = this.ownerListItems.find(f => f.ownername == (<HTMLInputElement>document.getElementById('Ownerid')).value).ownerid;
    else {
      alert("Please select Owner from list");
    return true;
    }
  }

  if(this.isSelected == null){
    if ((<HTMLInputElement>document.getElementById('Associateid')).value)
      this.addPaymentPay.consultantid = this.AssociateList.find(f => f.name == (<HTMLInputElement>document.getElementById('Associateid')).value).id;
    else {
      alert("Please select Associate form list");
    return true;
    }
  }

    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addPaymentPay.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }
    this.addPaymentPay.amountpaid = Number(this.addPaymentPay.amountpaid);
    this.addPaymentPay.totalamount = Number(this.addPaymentPay.totalamount);
    //this.addPaymentPay.percentage = Number(this.addPaymentPay.percentage);
    this.apiservice.AddPaymentPay(this.addPaymentPay)
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

  getAssociateList() {
    this.apiservice.getAssociates().subscribe(
      (response: any) => {
        this.AssociateList = response
      },
      error => {
        console.log(error);
      }
    )
  }

  getOwnerList() {
    this.apiservice.getOwners().subscribe(
      (response: any) => {
        this.ownerListItems = response
      },
        error => {
          console.log(error);
        })
  }

  private selectedLink: string="Associate";        
  
  setradio(e: string): void   
  {  
    this.selectedLink = e;       
  }  
    isSelected(name: string): boolean   
  {  
        if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
            return false;  
  }  
        return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }  
}
