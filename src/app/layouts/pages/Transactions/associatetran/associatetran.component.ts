import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-associatetran',
  templateUrl: './associatetran.component.html',
  styleUrls: ['./associatetran.component.css']
})
export class AssociateTranComponent implements OnInit {

  constructor(private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
  }

}
