import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  public propertyItems: Property=new Property();
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private notifier: NotifierService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPropertyList();
  }

  getPropertyList() {
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

  getProperty(id) {
    this.apiservice.getProperty(id).subscribe(
      (items: Property) => {
        this.propertyItems = items;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  deleteProperty(id, name) {
    if (confirm("Do You wish to Delete the Plot - " + name + "?")) {
      this.apiservice.DeleteProperty(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getPropertyList();
            }
          }
        })
    }
  }

  goEdit(id) {
    var url = '/UnitEdit?id=' + id;
    this.router.navigateByUrl(url);
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

}
