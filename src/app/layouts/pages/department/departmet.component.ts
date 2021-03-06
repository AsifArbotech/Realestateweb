import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from '../../../_models/department'
import { ApiService } from '../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departmet',
  templateUrl: './departmet.component.html',
  styleUrls: ['./departmet.component.css']
})
export class DepartmetComponent implements OnInit {

  public departmentsListItems: Array<Department>;
  public departmentsItems: Department;
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
              private apiservice:ApiService,
              private toastr: ToastrService) {
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
        this.toastr.error('Something went wrong');
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
        this.toastr.error('Something went wrong');
      }
    )
  }

  postdept(){
    var param = { Departmentname: this.model.departmentname }
    this.apiservice.AddDepartment(param)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.toastr.error(response.responseMsg);
        }else if(response.ResponseCode == 1){
          this.toastr.success(response.responseMsg);
          this.clearfields();
        }
      else{
        this.toastr.error('Something went wrong');
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
          this.toastr.error(response.responseMsg);
        }else if(response.ResponseCode == 1){
          this.toastr.success(response.responseMsg);
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
            this.toastr.error(response.responseMsg);
          } else if (response.responseCode == 1) {
            this.toastr.success(response.responseMsg);
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
