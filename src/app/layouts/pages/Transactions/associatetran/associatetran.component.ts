import { Component, OnInit } from '@angular/core';
import { AssociateTransaction } from '../../../../_models/Associate';
import { ApiService } from '../../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-associatetran',
  templateUrl: './associatetran.component.html',
  styleUrls: ['./associatetran.component.css']
})
export class AssociateTranComponent implements OnInit {
  public AssTransactionlist: Array<AssociateTransaction> = new Array<AssociateTransaction>();

  page = 1;
  pageSize = 10;

  constructor(private apiservice: ApiService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAssTransactionList();
  }

  getAssTransactionList() {
    this.apiservice.getAssTransaction().subscribe(
      (response: any) => {
        this.AssTransactionlist = response;
      },
      error => {
        console.log(error);
        this.toastr.success('Something went wrong');
      }
    )
  }

  getAssTransactionlistItems() {
    if (this.AssTransactionlist)
      if (this.AssTransactionlist.length > this.pageSize) {
        return this.AssTransactionlist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.AssTransactionlist;
      }
  }

}
