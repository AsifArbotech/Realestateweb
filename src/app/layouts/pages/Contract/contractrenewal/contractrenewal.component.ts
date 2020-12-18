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
  public allcontractlist: Array<Contract> = new Array<Contract>();
  public ContractList: Array<Contract> = new Array<Contract>();
  contractren: ContractRenewal = new ContractRenewal();

  ActionType = "Add Contract Renewal";
  page = 1;
  pageSize = 10;
  unit: String = '';
  customername: String = '';
  date;
  contractno = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getContractRenList();
    this.getAllContracts();
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

  Savecontractren() {
    if (parseInt((<HTMLInputElement>document.getElementById('contractcode')).value) == NaN) {
      alert("Invalid Contract Code.");
      return false;
    }
    this.contractren.contractid = this.allcontractlist.find(f => f.contractcode == parseInt((<HTMLInputElement>document.getElementById('contractcode')).value)).contractid;
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

  getAllContracts() {
    this.apiservice.getContractList().subscribe(
      (response: any) => {
        this.allcontractlist = response
      },
      error => {
        console.log(error);

      }
    )
  }

  getcontractdetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.allcontractlist.find(f => f.contractcode == Number((event.target as HTMLInputElement).value))
      if (obj) {
        //this.projectname = obj.projectname;
        this.unit = obj.plotno;
        this.date = obj.contractdate.toString().split('T')[0];
        //this.associatename = obj.consultantname;
        this.customername = obj.customername;
      }
    }
  }

  clearfields() {
    this.contractren = new ContractRenewal();
      this.unit = '';
      this.customername = '';
      this.date = '';
      this.contractno = '';    
  }
}
