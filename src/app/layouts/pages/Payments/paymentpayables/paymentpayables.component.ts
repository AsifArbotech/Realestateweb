import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';
import { Customers } from '../../../../_models/Customers';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { Owner } from '../../../../_models/owners';
import { Associate } from '../../../../_models/Associate';

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
  isShowTextField = false;
  constructor(private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getCustomerslist();
    this.getProjectsList();
    this.getPropertyList();
    this.getOwnerList();
    this.getAssociateList();
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
