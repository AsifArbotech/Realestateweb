import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { Contract , ContractRenewal } from '../../../../_models/contract';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-contractrenewal',
  templateUrl: './contractrenewal.component.html',
  styleUrls: ['./contractrenewal.component.css']
})
export class ContractrenewalComponent implements OnInit {
  
  public ContractList: Array<Contract> = new Array<Contract>();
  contractren: ContractRenewal = new ContractRenewal();

  ActionType = "Add Contract Renewal";
  page = 1;
  pageSize = 10;
  ownername: String = '';
  contractcode = '';
  unit: String = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getContractRenList();
  }

  getContractRenList() {
    this.apiservice.getContractRenList().subscribe(
      (response: any) => {
        this.ContractList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getContractRenlistItems() {
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

  getcontractdetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.ContractList.find(f => f.contractcode == Number((event.target as HTMLInputElement).value))
      if (obj) {
        this.ownername = obj.ownername;
        this.unit = obj.plotno;
      }
    }
  }

  Savecontractren() {
    if (parseInt((<HTMLInputElement>document.getElementById('salesenquireno')).value) == NaN) {
      alert("Invalid Contract Code.");
      return false;
    }
    this.contractren.contractid = this.ContractList.find(f => f.contractcode == parseInt((<HTMLInputElement>document.getElementById('contractcode')).value)).contractid;
    this.apiservice.AddContractRen(this.contractren)
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
          this.contractren = new ContractRenewal();
          this.getContractRenList();
        }
      })
  }

  clearfields() {
    this.contractren = new ContractRenewal();
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Contract Renewal";
  }
}
