import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-ownertransaction',
  templateUrl: './ownertransaction.component.html',
  styleUrls: ['./ownertransaction.component.css']
})
export class OwnerTransactionComponent implements OnInit {

  constructor(private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
  }

}
