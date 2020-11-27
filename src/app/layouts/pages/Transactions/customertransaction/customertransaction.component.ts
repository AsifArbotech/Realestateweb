import { Component, OnInit } from '@angular/core';
import { CustomerTransaction } from '../../../../_models/Customers';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-customertransaction',
  templateUrl: './customertransaction.component.html',
  styleUrls: ['./customertransaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {
  public Transactionlist: Array<CustomerTransaction> = new Array<CustomerTransaction>();

  page = 1;
  pageSize = 10;

  constructor( private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getTransactionList();
  }

  getTransactionList() {
    this.apiservice.getCustTransaction().subscribe(
      (response: any) => {
        this.Transactionlist = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getTransactionlistItems() {
    if (this.Transactionlist)
      if (this.Transactionlist.length > this.pageSize) {
        return this.Transactionlist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.Transactionlist;
      }
  }
}
