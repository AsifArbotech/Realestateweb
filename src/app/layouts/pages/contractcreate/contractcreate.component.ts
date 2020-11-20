import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { Contract , AddContract } from '../../../_models/contract';
import { Property } from '../../../_models/property';
import { Owner } from '../../../_models/owners';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-contractcreate',
  templateUrl: './contractcreate.component.html',
  styleUrls: ['./contractcreate.component.css']
})
export class ContractcreateComponent implements OnInit {

  public propertyListItems: Array<Property> = new Array<Property>();
  public ownerListItems: Array<Owner> = new Array<Owner>();
  public ContractList: Array<Contract> = new Array<Contract>();
  addContract: AddContract = new AddContract();

   ActionType = "Add Contract";
   page = 1;
   pageSize = 10;
   owner: string = '';
   unit: String = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getContractList();
    this.getPropertyList();
    this.getOwnerList();
  }

  getContractList() {
    this.apiservice.getContractList().subscribe(
      (response: any) => {
        this.ContractList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getContractlistItems() {
    if (this.ContractList)
      if (this.ContractList.length > this.pageSize) {
        return this.ContractList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.ContractList;
    }
  }

  getPropertyList() {
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.propertyListItems = response
      },
        error => {
          console.log(error);
        })
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

  SaveContract() {
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.addContract.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property from list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Ownerid')).value)
      this.addContract.ownerid = this.ownerListItems.find(f => f.ownername == (<HTMLInputElement>document.getElementById('Ownerid')).value).ownerid;
    else {
      alert("Please select Owner from list");
      return;
    }
    this.addContract.noofinstallments = Number(this.addContract.noofinstallments);
    this.apiservice.AddContract(this.addContract)
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
        this.getContractList();
      }
    })
  } 

  DeleteContract(id) {
    if (confirm("Do You wish to Delete the Contract?")) {
      this.apiservice.DeleteContract(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getContractList();
            }
          }
        })
      }
    }

  clearfields() {
    (<HTMLInputElement>document.getElementById('ownerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.addContract = new AddContract();
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Contract";
    if (this.propertyListItems.length == 0)
      this.getPropertyList();
    if (this.ownerListItems.length == 0)
      this.getOwnerList();
  }
}
