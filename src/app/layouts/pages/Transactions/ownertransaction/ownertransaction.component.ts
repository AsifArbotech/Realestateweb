import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { OwnerTransaction } from '../../../../_models/owners';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ownertransaction',
  templateUrl: './ownertransaction.component.html',
  styleUrls: ['./ownertransaction.component.css']
})
export class OwnerTransactionComponent implements OnInit {
  public Ownertransactionlist: Array<OwnerTransaction> = new Array<OwnerTransaction>();
  page = 1;
  pageSize = 10;

  constructor(private apiservice: ApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getOwnerTransactionList();
  }

  getOwnerTransactionList() {
    this.apiservice.getOwnerTransaction().subscribe(
      (response: any) => {
        this.Ownertransactionlist = response;
      },
      error => {
        console.log(error);
        this.toastr.success('Something went wrong');
      }
    )
  }

  getOwnerTransactionlistItems() {
    if (this.Ownertransactionlist)
      if (this.Ownertransactionlist.length > this.pageSize) {
        return this.Ownertransactionlist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.Ownertransactionlist;
      }
  }
}
