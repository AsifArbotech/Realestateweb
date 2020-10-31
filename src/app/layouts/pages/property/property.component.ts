import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../_models/property'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  public propertyListItems: Array<Property>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getPropertyList();
  }

  getPropertyList() {
    debugger;
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.propertyListItems = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getPropertytItems() {
    if (this.propertyListItems)
      if (this.propertyListItems.length > this.pageSize) {
        return this.propertyListItems.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.propertyListItems;
      }
  }

}
