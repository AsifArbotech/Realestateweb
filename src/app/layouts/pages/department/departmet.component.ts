import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../../../_models/department'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-departmet',
  templateUrl: './departmet.component.html',
  styleUrls: ['./departmet.component.css']
})
export class DepartmetComponent implements OnInit {

  public departmentsListItems: Array<Department>;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private notifier: NotifierService) {
                this.clearfields();
               }

  ngOnInit() {
    this.getDeptsList();
    this.departmentsListItems;
  }

  getDeptsList(){
    this.apiservice.getDepartments().subscribe(
      (response:Array<Department>)=>{
        this.departmentsListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getDeptsListItems() {
    if (this.departmentsListItems.length > this.pageSize) {
      return this.departmentsListItems.slice(
        (this.page - 1) * this.pageSize,
        this.page * this.pageSize
      );
    } else {
      return this.departmentsListItems;
    }
  }

  getDept(id){
    this.apiservice.getDepartment(id).subscribe(
      (response:any)=>{
        this.departmentsListItems=response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  postdept(){
    var param = { Departmentname: this.model.departmentname }
    this.apiservice.AddDepartment(param)
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

 deleteDept( name){
  var param = {Id:this.model.id, Departmentname: this.model.departmentname }
  if (confirm("Do You wish to Delete the Department - " + name + "?")){
    this.apiservice.DeleteDepartment(param)
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

updateDept(id){
  this.apiservice.EditDept(id)
      .subscribe((response:any)=>{
        this.departmentsListItems=response
        if (response) {
          if(response.ResponseCode == 0){
            this.notifier.notify("error", response.ResponseMessage);
          }else if(response.ResponseCode == 1){
            this.notifier.notify("success", response.ResponseMessage);
      }
    }
    })
}

 onNavigate(url: string) {
  this.router.navigateByUrl(url);
 }

 clearfields(){
  this.model = {
    departmentname:"",
  }
 }

}
