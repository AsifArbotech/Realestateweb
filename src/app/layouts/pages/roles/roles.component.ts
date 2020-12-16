import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../_services/api.service';
import { Roles } from '../../../_models/roles';
import { NotifierService } from 'angular-notifier';
import { ReportsComponent } from '../../Reports/reports/reports.component'

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  public rolessListItems: Array<Roles>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private notifier: NotifierService, private reports: ReportsComponent) {
    this.clearfields();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  senddatatoreport(){
    debugger;
    let object = {
      columns: ["RoleID", "Role Name", "Description", "Description"],
      keys: ["id", "rolename", "description", "description"],
      data: this.getRolesItems()
    }
    return object;
  }

  downloadfile() {
    this.reports.generateReport(["RoleID", "Role Name", "Description", "Description"], ["id", "rolename", "description", "description"], this.getRolesItems());
  }

  getUsers() {
    this.apiservice.getRoles().subscribe(
      (items: Array<Roles>) => {
        this.rolessListItems = items
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getRolesItems() {
    if (this.rolessListItems.length > this.pageSize) {
      return this.rolessListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.rolessListItems;
    }
  }

  postRole() {
    var param = { Rolename: this.model.rolename, Description: this.model.description }
    this.apiservice.AddRole(param)
      .subscribe((response: any) => {
        if (response) {
          if (response.ResponseCode == 0) {
            this.notifier.notify("error", response.ResponseMessage);
          } else if (response.ResponseCode == 1) {
            this.notifier.notify("success", response.ResponseMessage);
            this.clearfields();
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
        }
      })
  }

  deleteRole(id, name) {
    if (confirm("Do You wish to Delete the User - " + name + "?")) {
      this.apiservice.DeleteRole(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.ResponseCode == 0) {
              this.notifier.notify("error", response.ResponseMessage);
            } else if (response.ResponseCode == 1) {
              this.notifier.notify("success", response.ResponseMessage);
            }
          }
        })
    }
  }

  clearfields() {
    this.model = {
      rolename: "",
      description: "",
    }
  }

}
