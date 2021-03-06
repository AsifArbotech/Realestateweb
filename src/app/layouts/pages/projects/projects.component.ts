import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Project } from '../../../_models/project';
import { ApiService } from '../../../_services/api.service';
//import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projectsListItems: Array<Project>;
  public projectsItems: Project=new Project();
  
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    //private notifier: NotifierService,
    private modalService: NgbModal,
    private toastr: ToastrService) {
    this.clearfields();
  }

  ngOnInit(): void {
    this.getProjectsList();
  }

  getProjectsList() {
    this.apiservice.getProjects().subscribe(
      (response: any) => {
        this.projectsListItems = response
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  getProjecttItems() {
    if (this.projectsListItems)
      if (this.projectsListItems.length > this.pageSize) {
        return this.projectsListItems.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.projectsListItems;
      }
  }

  getproject(projectid) {
    this.apiservice.getProject(projectid).subscribe(
      (response: any) => {
        this.projectsItems = response;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  updateProject(){
    this.apiservice.EditProject(this.projectsItems)
      .subscribe((response: any) => {
        this.projectsItems = response
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
            //this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
            //this.notifier.notify("success", response.responseMsg);
            this.getProjectsList();
          }
        }
      })
  }

  postproject() {
    var param = { ProjectName: this.model.projectname, LocationAddress: this.model.locationaddress, LandMark: this.model.landmark, SurveyNos: this.model.surveynos, VillageName: this.model.villagename, MandalName: this.model.mandalname, DistrictName: this.model.districtname, StateName: this.model.statename, PinCode: this.model.pincode, Notes: this.model.notes }
    this.apiservice.AddProject(param)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.modalService.dismissAll();
            this.toastr.success(response.responseMsg);
            this.clearfields();
            this.getProjectsList()
          }
          else {
            this.toastr.error('Something went wrong');
          }
        }
      })
  }


  deleteProject(id, name) {
    if (confirm("Do You wish to Delete the Project - " + name + "?")) {
      this.apiservice.DeleteProject(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getProjectsList();
            }
          }
        })
    }
  }

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

  clearfields() {
    this.model = {
      projectname: "",
      locationaddress: "",
      landmark: "",
      surveynos: "",
      villagename: "",
      mandalname: "",
      districtname: "",
      statename: "",
      pincode: "",
      notes: "",
    }
  }
}

interface ProjectPreview {
  projectid: number;
  projectname: string;
  locationaddress: string;
  landmark: string;
  surveynos: string;
  villagename: string;
  mandalname: string;
  districtname: string;
  statename: string;
  pincode: string;
  notes: string;
}
