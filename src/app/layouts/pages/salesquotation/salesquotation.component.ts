import { Component, OnInit } from '@angular/core';
import { Customers } from '../../../_models/Customers';
import { ApiService } from '../../../_services/api.service';
import { Project } from '../../../_models/project';
import { Property } from '../../../_models/property';
import { Associate } from '../../../_models/Associate';
import { Salesenquire, Sales } from '../../../_models/Sales';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-salesquotation',
  templateUrl: './salesquotation.component.html',
  styleUrls: ['./salesquotation.component.css']
})
export class SalesquotationComponent implements OnInit {

  public customerslist: Array<Customers> = new Array<Customers>();
  public projectsListItems: Array<Project> = new Array<Project>();
  public propertyListItems: Array<Property> = new Array<Property>();
  public AssociateList: Array<Associate> = new Array<Associate>();
  public SalesList: Array<Sales> = new Array<Sales>();
  salesenquire: Salesenquire = new Salesenquire();
  ActionType = "Add Sales Quotation";
  page = 1;
  pageSize = 10;
  
  constructor(
    private apiservice: ApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
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

}
