import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../_services/api.service';
import { AddUser } from '../../../_models/user';
import { ToastrService } from 'ngx-toastr';
import {ReportsComponent} from '../../Reports/reports/reports.component'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersListItems: Array<AddUser>;
  public usersItems: AddUser=new AddUser();
  users: any;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private Report:ReportsComponent
    ) {
    this.clearfields();
    this.usersListItems;
  }

  ngOnInit() {
    this.getUsers();
  }

 

  getUsers() {
    this.apiservice.getUsers().subscribe(
      (items: Array<AddUser>) => {
        this.usersListItems = items
      },
      error => {
        console.log(error);
        this.toastr.success('Something went wrong');
      }
    )
  }

  getUsersItems() {
    if (this.usersListItems)
      if (this.usersListItems.length > this.pageSize) {
        return this.usersListItems.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.usersListItems;
      }
  }

  getUser(id) {
    this.apiservice.getUser(id).subscribe(
      (items: AddUser) => {
        this.usersItems = items;
      },
      error => {
        console.log(error);
        this.toastr.success('Something went wrong');
      }
    )
  }

  postUser() {
    var param = { Name: "Asif", Username: this.model.username, Password: this.model.password, Emailid: this.model.emailid, Mobileno: this.model.mobileno }
    this.apiservice.AddUser(param)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
            this.clearfields();
            this.getUsers();
          }
          else {
            this.toastr.success('Something went wrong');
          }
        }
      })
  }

  deleteUser(id, name) {
    if (confirm("Do You wish to Delete the User - " + name + "?")) {
      this.apiservice.DeleteUser(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getUsers();
            }
          }
        })
    }
  }

  updateUser() {
    this.apiservice.EditUser(this.usersItems)
      .subscribe((response: any) => {
        this.usersListItems = response
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
            this.getUsers();
          }
        }
      })
  }

  openModal(editUserModel) {
    this.modalService.open(editUserModel, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

  onNavigate(url: string) {
    this.router.navigateByUrl(url);
  }

  clearfields() {
    this.model = {
      username: "",
      password: "",
      emailid: "",
      mobileno: ""
    }
  }
}
