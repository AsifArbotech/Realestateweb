import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../../_services/api.service';
import { Contract , AddContract } from '../../../../_models/contract';
import { Property } from '../../../../_models/property';
import { Customers } from '../../../../_models/Customers';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contractcreate',
  templateUrl: './contractcreate.component.html',
  styleUrls: ['./contractcreate.component.css']
})
export class ContractcreateComponent implements OnInit {

  public propertyListItems: Array<Property> = new Array<Property>();
  public customerslist: Array<Customers> = new Array<Customers>();
  public ContractList: Array<Contract> = new Array<Contract>();
  addContract: AddContract = new AddContract();
  Contract : AddContract = new AddContract();
   ActionType = "Add Agreement";
   page = 1;
   pageSize = 10;
   owner: string = '';
   unit: String = '';

  constructor(private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getContractList();
    this.getPropertyList();
    this.getCustomerslist();
  }

  getContractList() {
    this.apiservice.getContractList().subscribe(
      (response: any) => {
        this.ContractList = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
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

  
  EditContract(id) {
   
    this.GetAllSuggesstion();
    this.apiservice.getContractByID(id).subscribe(
      (response:any) => {
        this.Contract = response;

        (<HTMLInputElement>document.getElementById('Customerid')).value = response.name;
        (<HTMLInputElement>document.getElementById('Propertyid')).value = response.plotno;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
    this.ActionType = "Edit Agreement";
  }


  SaveContract() {
    if ((<HTMLInputElement>document.getElementById('Propertyid')).value)
      this.Contract.unitid = this.propertyListItems.find(f => f.plotno == (<HTMLInputElement>document.getElementById('Propertyid')).value).id;
    else {
      alert("Please select Property from list");
      return;
    }

    if ((<HTMLInputElement>document.getElementById('Customerid')).value)
      this.Contract.customerid = this.customerslist.find(f => f.name == (<HTMLInputElement>document.getElementById('Customerid')).value).id;
    else {
      alert("Please select Customer from list");
      return;
    }
    this.Contract.customername=(<HTMLInputElement>document.getElementById('Customerid')).value
    this.Contract.plotno=(<HTMLInputElement>document.getElementById('Propertyid')).value
    this.Contract.noofinstallments = Number(this.Contract.noofinstallments);
    this.apiservice.AddContract(this.Contract)
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
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getContractList();
            }
          }
        })
      }
    }

  clearfields() {
    (<HTMLInputElement>document.getElementById('Customerid')).value = "";
    (<HTMLInputElement>document.getElementById('Propertyid')).value = "";
    this.addContract = new AddContract();
  }

  GetAllSuggesstion() {
    //this.clearfields();
    this.ActionType = "Add Agreement";
    if (this.propertyListItems.length == 0)
      this.getPropertyList();
    if (this.customerslist.length == 0)
      this.getCustomerslist();
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
