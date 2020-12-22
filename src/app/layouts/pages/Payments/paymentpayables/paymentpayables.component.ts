import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Customers } from '../../../../_models/Customers';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { Owner } from '../../../../_models/owners';
import { Associate } from '../../../../_models/Associate';
import { Payment, PaymentPayOwner, PaymentPayAss } from '../../../../_models/payments';

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
  addPaymentPayowner: PaymentPayOwner = new PaymentPayOwner();
  addPaymentPayass: PaymentPayAss = new PaymentPayAss();

  page = 1;
  pageSize = 10;
  projectname: String = '';
  unit: String = '';
  owner: string = '';
  associatename: String = '';

  isShowTextField = false;
  constructor(private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

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
        this.toastr.error('Something went wrong');    
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

  SavePaymentPayAss(){
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.addPaymentPayass.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
    return;
    }
    if (this.selectedLink == "Associate") {
      if ((<HTMLInputElement>document.getElementById('Associateid')).value)
        this.addPaymentPayass.consultantid = this.AssociateList.find(f => f.name == (<HTMLInputElement>document.getElementById('Associateid')).value).id;
      else {
        alert("Please select Associate form list");
        return true;
      }
    }
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addPaymentPayass.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
    return;
    }
    this.addPaymentPayass.amountpaid = Number(this.addPaymentPayass.amountpaid);
    this.addPaymentPayass.totalamount = Number(this.addPaymentPayass.totalamount);
    this.addPaymentPayass.percentage = Number(this.addPaymentPayass.percentage);
    this.apiservice.AddPaymentPay(this.addPaymentPayass)
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
        }
      })
  }

  SavePaymentPayOwner() {
    debugger;
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.addPaymentPayowner.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }

    if (this.selectedLink == "Owner") {
      if ((<HTMLInputElement>document.getElementById('Ownerid')).value)
        this.addPaymentPayowner.ownerid = this.ownerListItems.find(f => f.ownername == (<HTMLInputElement>document.getElementById('Ownerid')).value).ownerid;
      else {
        alert("Please select Owner from list");
        return true;
      }
    }

    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addPaymentPayowner.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }
    this.addPaymentPayowner.amountpaid = Number(this.addPaymentPayowner.amountpaid);
    this.addPaymentPayowner.totalamount = Number(this.addPaymentPayowner.totalamount);
    this.apiservice.AddPaymentPay(this.addPaymentPayowner)
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
        }
      })
  }

  SavePaymentPay() {
    if(this.addPaymentPayass.paymentto == "Associate"){
      this.SavePaymentPayAss();
    }
    else{
        this.SavePaymentPayOwner();
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

  private selectedLink: string = "Associate";

  setradio(e: string): void {
    this.selectedLink = e;
  }
  isSelected(name: string): boolean {
    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }
    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
