import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifierService } from 'angular-notifier';
import { ApiService } from '../../../_services/api.service';

@Component({
  selector: 'app-salesquotation',
  templateUrl: './salesquotation.component.html',
  styleUrls: ['./salesquotation.component.css']
})
export class SalesquotationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
