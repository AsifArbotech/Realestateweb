import { Component, OnInit } from '@angular/core';
import { Customers } from '../../../_models/Customers';
import { ApiService } from '../../../_services/api.service';
import { Project } from '../../../_models/project';
import { Property } from '../../../_models/property';
import { Associate } from '../../../_models/Associate';
import { Salesenquire, Sales } from '../../../_models/Sales';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-salesenquire',
  templateUrl: './salesenquire.component.html',
  styleUrls: ['./salesenquire.component.css']
})
export class SalesenquireComponent implements OnInit {
  public customerslist: Array<Customers> = new Array<Customers>();
  public projectsListItems: Array<Project> = new Array<Project>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public AssociateList: Array<Associate> = new Array<Associate>();
  public SalesList: Array<Sales> = new Array<Sales>();
  salesenquire: Salesenquire = new Salesenquire();
  ActionType = "Add Sales Enquire";
  page = 1;
  pageSize = 10;

  constructor(
    private apiservice: ApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {

    this.getSalesEnquireList();
  }

  getSalesEnquireList() {
    this.apiservice.getSalesEnquireList().subscribe(
      (response: any) => {
        this.SalesList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getSalesEnquirelistItems() {
    if (this.SalesList)
      if (this.SalesList.length > this.pageSize) {
        return this.SalesList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.SalesList;
      }
  }

  SaveEnquire() {
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.salesenquire.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }
      

    if ((<HTMLInputElement>document.getElementById('Customerid')).value)
      this.salesenquire.customerid = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('Customerid')).value).id;
    else {
      alert("Please select Customer form list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.salesenquire.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property form list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Associateid')).value)
      this.salesenquire.consultantid = this.AssociateList.find(f => f.name == (<HTMLInputElement>document.getElementById('Associateid')).value).id;
    else {
      alert("Please select Associate form list");
      return;
    }
    this.salesenquire.amount = Number(this.salesenquire.amount);
    this.apiservice.AddSalesEnquire(this.salesenquire)
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
          this.getSalesEnquireList();
        }
      })



  }

  EditSalesEnquire(id) {
    this.ActionType = "Edit Sales Enquire";
    this.GetAllSuggesstion();
    this.apiservice.getSalesEnquireByID(id).subscribe(
      (response: Salesenquire) => {
       // response.createdon = new Date(response.createdon.toString().split('T')[0]);
        response.createdon =response.createdon;
        this.salesenquire = response;
        (<HTMLInputElement>document.getElementById('Projectid')).value = this.projectsListItems.find(f => f.projectid == this.salesenquire.projectid).projectname;
        (<HTMLInputElement>document.getElementById('Customerid')).value = this.customerslist.find(f => f.id == this.salesenquire.customerid).name;
        (<HTMLInputElement>document.getElementById('Propertyid')).value = this.propertyListItems.find(f => f.id == this.salesenquire.unitid).plotno;
        (<HTMLInputElement>document.getElementById('Associateid')).value = this.AssociateList.find(f => f.id == this.salesenquire.consultantid).name;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )

    this.ActionType = "Edit Sales Enquire";
  }

  clearfields() {
    (<HTMLInputElement>document.getElementById('Projectid')).value = "";
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    (<HTMLInputElement>document.getElementById('Associateid')).value = "";
    this.salesenquire = new Salesenquire();
  }



  GetAllSuggesstion() {
    this.ActionType = "Add Sales Enquire";
    if (this.customerslist.length == 0)
      this.getCustomerssuggesstionlist();
    if (this.projectsListItems.length == 0)
      this.getProjectsList();
    if (this.propertyListItems.length == 0)
      this.getPropertyList();

    if (this.AssociateList.length == 0)
      this.getAssociateList();
  }


  DeleteSalesEnquire(id) {
    if (confirm("Do You wish to Delete the Enquire?")) {
      this.apiservice.DeleteSalesEnquireByID(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getSalesEnquireList();
            }
          }
        })
    }
  }

  getCustomerssuggesstionlist() {
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

}
