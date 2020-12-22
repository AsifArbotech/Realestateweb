import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Property } from '../../../../_models/property';
import { Project } from '../../../../_models/project';
import { ApiService } from '../../../../_services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  public projectsListItems: Array<Project> = new Array<Project>();
  property: Property = new Property();
  public propertyListItems: Array<Property>;
  public propertyItems: Property=new Property();

  ActionType = "Add Property";
  model: any = {};
  page = 1;
  pageSize = 10;

  constructor(private router: Router,
    private apiservice: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPropertyList();
    this.getProjectsList();
  }

  getPropertyList() {
    this.apiservice.getProperties().subscribe(
      (response: any) => {
        this.propertyListItems = response
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
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

  postUnit(){
    if ((<HTMLInputElement>document.getElementById('Projectid')).value)
      this.property.projectid = this.projectsListItems.find(f => f.projectname == (<HTMLInputElement>document.getElementById('Projectid')).value).projectid;
    else {
      alert("Please select project form list");
    return;
    }
      var param = {PROJECTID:this.property.projectid,
                 PLOTNO:this.model.plotno,
                 PHASENO:this.model.phaseno,     
                 BLOCKNO:this.model.blockno,
                 SURVEYNO:this.model.surveyno,
                 LANDMARK:this.model.landmark,
                 PLOTSITE:parseInt(this.model.plotsite),
                 SITEUNITS:this.model.siteunits,
                 CROSSPLOT:parseInt(this.model.crossplot),
                 PLOTDIMENSION:this.model.plotdimension,
                 FACING:parseInt(this.model.facing),
                 FACINGSITE:this.model.facingsite,
                 ROADSITE:this.model.roadsite,
                 CORNERPLOT:parseInt(this.model.cornerplot),
                 CORNERPLOTDIMENSIONS:this.model.cornerplotdimensions,
                 PARKSIDEPLOT:parseInt(this.model.parksideplot),
                 DISPUTENOTES:this.model.disputenotes,
                 NOCISSUED:parseInt(this.model.nocissued),
                 NOCCOPY:this.model.noccopy,
                 PLOTSOLDAMOUNT:parseFloat(this.model.plotsoldamount),
                 AMOUNTPAID:parseFloat(this.model.amountpaid),
                 AMOUNTBALANCE:parseFloat(this.model.amountbalance),
                }
    this.apiservice.AddProperty(param)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.toastr.error(response.responseMsg);
        }else if(response.ResponseCode == 1){
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
        }
      else{
        this.toastr.error('Something went wrong');
        }
        this.clearfields();
        this.getPropertyList();
      } 
   })
  }

  updateUnit(){
    this.propertyItems.parksideplot = Number(this.propertyItems.parksideplot);
    this.propertyItems.facing = Number(this.propertyItems.facing);
    this.propertyItems.cornerplot = Number(this.propertyItems.cornerplot);
    this.propertyItems.crossplot = Number(this.propertyItems.crossplot);
    this.apiservice.EditProperty(this.propertyItems)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.toastr.error(response.responseMsg);
        }else if(response.ResponseCode == 1){
          this.modalService.dismissAll();
          this.toastr.success(response.responseMsg);
        }
      else{
        this.toastr.error('Something went wrong');
        }
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

  getProperty(id) {
    this.apiservice.getProperty(id).subscribe(
      (items: Property) => {
        this.propertyItems = items;
      },
      error => {
        console.log(error);
        this.toastr.error('Something went wrong');
      }
    )
  }

  deleteProperty(id, name) {
    if (confirm("Do You wish to Delete the Plot - " + name + "?")) {
      this.apiservice.DeleteProperty(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.toastr.error(response.responseMsg);
            } else if (response.responseCode == 1) {
              this.toastr.success(response.responseMsg);
              this.getPropertyList();
            }
          }
        })
    }
  }

  clearfields() {
    (<HTMLInputElement>document.getElementById('Projectid')).value = "";
    this.model = '';
  }

  //goEdit(id) {
  //  var url = '/UnitEdit?id=' + id;
  //  this.router.navigateByUrl(url);
  //}

  openModal(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    }, (reason) => {
    });
  };

}
