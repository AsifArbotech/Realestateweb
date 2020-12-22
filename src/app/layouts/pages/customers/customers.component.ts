import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Customers } from '../../../_models/Customers'
import { ApiService } from '../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  public CustomerList: Array<Customers>;
  public Customer: Customers = new Customers;
  ActionType = "Add Customers";
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(
    private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList() {
    this.apiservice.getCustomers().subscribe(
      (response: any) => {
        this.CustomerList = response
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  getCustomerslistItems() {
    if (this.CustomerList)
      if (this.CustomerList.length > this.pageSize) {
        return this.CustomerList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.CustomerList;
      }
  }

  getCustomer(id) {
    this.apiservice.getCustomer(id).subscribe(
      (response: Customers) => {
        this.Customer = response
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }


  EditCustomer(ID) {
    this.ActionType = "Edit Customer";
    this.Customer = new Customers();
    this.getCustomer(ID);
  }

  NewCustomer() {
    this.Customer = new Customers();
    this.ActionType = "Add Customer";
  }

  AddCustomer() {
    debugger;
    this.Customer.consultantreference = Number(this.Customer.consultantreference);
    this.apiservice.AddCustomers(this.Customer)
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
          this.Customer = new Customers();
          this.getCustomersList();
        }
      })
  }


  DeleteCustomer(id) {
    if (confirm("Do You wish to Delete the Customer?")) {
      this.apiservice.DeleteCustomers(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getCustomersList();
            }
          }
        })
    }
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
