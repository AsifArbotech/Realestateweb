import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../../_services/api.service';
import { Contract,ContractTerminate } from '../../../../_models/contract'

@Component({
  selector: 'app-contractterminate',
  templateUrl: './contractterminate.component.html',
  styleUrls: ['./contractterminate.component.css']
})
export class ContractterminateComponent implements OnInit {
  public allcontractlist: Array<Contract> = new Array<Contract>();
  public ContractList: Array<Contract> = new Array<Contract>();
  TerminateContract: ContractTerminate = new ContractTerminate();
  ActionType = "Add Agreement Terminate";
  page = 1;
  pageSize = 10;
  unit: String = '';
  customername: String = '';
  date;
  contractno = '';

  constructor(private apiservice: ApiService,
              private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getContractTerList();
    this.getAllContracts();
  }

  getContractTerList() {
    this.apiservice.getContractTerminateList().subscribe(
      (response: any) => {
        this.ContractList = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getContractTerlistItems() {
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

  SaveContractTerminate() {
    if (parseInt((<HTMLInputElement>document.getElementById('contractcode')).value) == NaN) {
      alert("Invalid Agreement No.");
      return false;
    }
    this.TerminateContract.contractid = this.allcontractlist.find(f => f.contractcode == parseInt((<HTMLInputElement>document.getElementById('contractcode')).value)).contractid;
    this.apiservice.AddTerminateContract(this.TerminateContract)
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
          this.TerminateContract = new ContractTerminate();
          this.getContractTerList();
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

  clearfields() {
    this.TerminateContract = new ContractTerminate();
    this.unit = '';
    this.customername = '';
    this.date = '';
    this.contractno = '';
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
}
