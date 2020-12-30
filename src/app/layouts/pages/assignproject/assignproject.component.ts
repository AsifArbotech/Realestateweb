import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../_services/api.service';
import { Project } from '../../../_models/project';
import { User } from '../../../_models/user';
import { AssignProject } from '../../../_models/assignproject';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assignproject',
  templateUrl: './assignproject.component.html',
  styleUrls: ['./assignproject.component.css']
})
export class AssignprojectComponent implements OnInit {

  public projectsListItems: Array<Project> = new Array<Project>();
  public usersListItems: Array<User> = new Array<User>();
  public assignprojectListItems: Array<AssignProject> = new Array<AssignProject>();
  assignproject: AssignProject = new AssignProject();

  page = 1;
  pageSize = 10;

  constructor(private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAssignProjectItems();
    this.getProjectsList();
    this.getUsersList();
  }

  getAssignProjects() {
    this.apiservice.Getassignprojects(this.assignproject.username,this.assignproject.projectname,this.assignproject.status).subscribe(
      (items: any ) => {
        this.assignprojectListItems = items
      },
      error => {
        console.log(error);
        this.toastr.success('Something went wrong');
      }
    )
  }

  getAssignProjectItems() {
    if (this.assignprojectListItems)
      if (this.assignprojectListItems.length > this.pageSize) {
        return this.assignprojectListItems.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.assignprojectListItems;
      }
  }

  AssignProject() {
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.assignproject.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
      return;
    }
    if ((<HTMLInputElement>document.getElementById('Userid')).value)
      this.assignproject.userid = this.usersListItems.find(f => f.userName == (<HTMLInputElement>document.getElementById('Userid')).value).Id;
    else {
      alert("Please select User form list");
      return;
    }
    this.apiservice.Getassignprojects(this.assignproject.userid,this.assignproject.projectid,this.assignproject.status = 1)
    .subscribe((response: any) => {
      if (response) {
        if (response.responseCode == 0) {
          this.toastr.error(response.responseMsg);
        } else if (response.responseCode == 1) {
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
        }
        else {
          this.toastr.error('Something went wrong');
        }        
        this.getAssignProjects();
      }
    })
  }


  getProjectsList() {
    this.apiservice.getProjects().subscribe(
      (response: any) => {
        this.projectsListItems = response
      },
      error => {
        console.log(error);

      }
    )
  }

  getUsersList() {
    this.apiservice.getUsers().subscribe(
      (response: any) => {
        this.usersListItems = response
      },
      error => {
        console.log(error);

      }
    )
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };
}
