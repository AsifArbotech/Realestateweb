import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from '../../../_models/project'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projectsListItems: Array<Project>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) { 
                this.clearfields();
              }

  ngOnInit(): void {
    this.getProjectsList();
  }

  getProjectsList(){
    this.apiservice.getProjects().subscribe(
      (response:any)=>{
        this.projectsListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getProjecttItems() {
    if (this.projectsListItems.length > this.pageSize) {
      return this.projectsListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.projectsListItems;
    }
  }

  getproject(project:Project){
    this.apiservice.getProject(project.projectid).subscribe(
      (response:any) =>{
        this.projectsListItems=response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }
   
  postproject(){
    var param = { ProjectName: this.model.projectname , LocationAddres: this.model.locationaddress ,LandMark: this.model.landmark, SurveyNo: this.model.surveynos, VillageName: this.model.villagename, MandalName: this.model.mandalname, DistrictName: this.model.districtname, StateName: this.model.statename, PinCode: this.model.pincode, Note: this.model.notes  }
    this.apiservice.AddProject(param)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.notifier.notify("error", response.ResponseMessage);
        }else if(response.ResponseCode == 1){
          this.notifier.notify("success", response.ResponseMessage);
          this.clearfields();
        }
      else{
          this.notifier.notify("error", "Something went wrong");
        }
      } 
   })
 }

  
deleteProject(id, name){
  if (confirm("Do You wish to Delete the Department - " + name + "?")){
    this.apiservice.DeleteClient(id)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.notifier.notify("error", response.ResponseMessage);
        }else if(response.ResponseCode == 1){
          this.notifier.notify("success", response.ResponseMessage);
    }
  }
  })
 }
}

clearfields(){
  this.model = {
    projectname:"",
    locationaddress:"",
    landmark:"",
    surveynos:"",
    villagename:"",
    mandalname:"",
    districtname:"",
    statename:"",
    pincode:"", 
    notes:"",
  }
 }


}
