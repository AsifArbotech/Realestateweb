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
  Projectpreview: ProjectPreview;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) { 
                this.clearfields();

              this.Projectpreview = {
                projectid:0,
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

  getproject(item:any){
    this.apiservice.getProject(item.projectid).subscribe(
      (response:any) =>{
        this.Projectpreview=response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }
   
  postproject(){
    var param = { ProjectName: this.model.projectname , LocationAddress: this.model.locationaddress ,LandMark: this.model.landmark, SurveyNos: this.model.surveynos, VillageName: this.model.villagename, MandalName: this.model.mandalname, DistrictName: this.model.districtname, StateName: this.model.statename, PinCode: this.model.pincode, Notes: this.model.notes  }
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
  if (confirm("Do You wish to Delete the Project - " + name + "?")){
    this.apiservice.DeleteProject(id)
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

interface ProjectPreview{
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