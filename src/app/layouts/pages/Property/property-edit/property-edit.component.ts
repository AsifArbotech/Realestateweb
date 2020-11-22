import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../../_services/api.service';
import { Property } from '../../../../_models/property'
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-property-edit',
  templateUrl: './property-edit.component.html',
  styleUrls: ['./property-edit.component.css']
})
export class PropertyEditComponent implements OnInit {

  public propertyItems: Property=new Property();
  model: any = {};

  constructor(private router: Router,
             private apiservice: ApiService,
             private notifier: NotifierService, private activatedRoute: ActivatedRoute) { 
              
              let params: any = this.activatedRoute.queryParams;
              this.propertyItems.id = +params.getValue("id").id;
              this.getProperty(this.propertyItems.id)
             }

  ngOnInit(): void {
    
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

  updateUnit(){
    var param = {PLOTNO:this.model.plotno,
      PHASENO:this.model.phaseno,     
      BLOCKNO:this.model.blockno,
      SURVEYNO:this.model.surveyno,
      LANDMARK:this.model.landmark,
      PLOTSITE:this.model.plotsite,
      SITEUNITS:this.model.siteunits,
      SALESDATE:"2020-11-01T10:59:31.454Z",
      HOLDDATE:"2020-11-01T10:59:31.454Z",
      CROSSPLOT:this.model.crossplot,
      NOTESSUPERUSER:this.model.notessuperuser,
      NOTESMANAGEMENT:this.model.notesmanagemen,
      NOTESSALESTEAM:this.model.notessalesteam,
      PLOTDIMENSION:this.model.plotdimension,
      FACING:this.model.facing,
      FACINGSITE:this.model.facingsite,
      ROADSITE:this.model.roadsite,
      CORNERPLOT:this.model.cornerplot,
      CORNERPLOTDIMENSIONS:this.model.cornerplotdimensions,
      PARKSIDEPLOT:this.model.parksideplot,
      SOLDOUT:this.model.soldout,
      ONHOLD:this.model.onhold,
      HOLDDURATIONINDAYS:this.model.holddurationindays,
      HOLDERIDAGENTID:this.model.holderidagentid,
      DISPUTE:this.model.dispute,
      DISPUTENOTES:this.model.disputenotes,
      NOCISSUED:this.model.nocissued,
      NOCCOPY:this.model.noccopy,
      PLOTSOLDAMOUNT:this.model.plotsoldamount,
      AMOUNTPAID:this.model.amountpaid,
      AMOUNTBALANCE:this.model.amountbalance,
      INSTALMENTS:this.model.instalments,
      INSTALMENTID:this.model.instalmentid,
      INSTALMENTTERM:this.model.instalmentterm,
      AGREEMENTDONE:this.model.agreementdone,
      AGREEMENTSCANCOPYLINK:this.model.agreementscancopylink,
      REGISTRATIONID:this.model.registrationid,
      REGISTRATIONDONE:this.model.registrationdone,
      REGISTRATIONSCANCOPYLINK:this.model.registrationscancopylink,
      ITRDONE:this.model.itrdone,
      ITRNO:this.model.itrno,
      RESELL:this.model.resell,
      RESELLID:this.model.resellerid,
      AGREEMENT:this.model.agreement,
      AGREEMENTID:this.model.agreementid,
      REAGREEMENT:this.model.reagreement,
      REAGREEMENTID:this.model.reagreementid,
                }
    this.apiservice.EditProperty(param)
    .subscribe((response:any)=>{
      if (response) {
        if(response.ResponseCode == 0){
          this.notifier.notify("error", response.ResponseMessage);
        }else if(response.ResponseCode == 1){
          this.notifier.notify("success", response.ResponseMessage);
        }
      else{
          this.notifier.notify("error", "Something went wrong");
        }
      } 
   })
  }

}
