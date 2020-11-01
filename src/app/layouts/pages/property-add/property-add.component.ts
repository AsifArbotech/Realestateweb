import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../../../_models/property'
import { ApiService } from '../../../_services/api.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.css']
})
export class PropertyAddComponent implements OnInit {

  property: Property;
  model: any = {};

  constructor(private router: Router, private apiservice:ApiService, private notifier: NotifierService) { 

    this.property={
      id:0,
      plotno: 0,
      phaseno: "",
      blockno: "",
      surveyno: "",
      landmark: "",
      plotsite: "",
      siteunits: "",
      crossplot: 0,
      notessuperuser: "",
      notesmanagemen: "",
      notessalesteam: "",
      ownerid: 0,
      plotdimension: "",
      facing: "",
      facingsite: "",
      roadsite: "",
      cornerplot: 0,
      cornerplotdimensions: "",
      parksideplot: 0,
      soldout: 0,
      //salesdate: ,
      onhold: 0,
      //holddate: Date;
      holddurationindays: 0,
      holderidagentid: 0,
      dispute: 0,
      disputenotes: "",
      nocissued: 0,
      noccopy: "",
      plotsoldamount: 0,
      amountpaid: 0,
      amountbalance: 0,
      instalments: 0,
      instalmentid: 0,
      instalmentterm: "",
      agreementdone: 0,
      agreementscancopylink: "",
      registrationid: 0,
      registrationdone: 0,
      registrationscancopylink: "",
      itrdone: 0,
      itrno: 0,
      resell: 0,
      resellerid: 0,
      agreement: 0,
      agreementid: 0,
      reagreement: 0,
      reagreementid: 0,
    }

    }

  ngOnInit(): void {
  }

  postUnit(){
    var param = {PLOTNO:parseInt(this.model.plotno),
                 PHASENO:this.model.phaseno,     
                 BLOCKNO:this.model.blockno,
                 SURVEYNO:this.model.surveyno,
                 LANDMARK:this.model.landmark,
                 PLOTSITE:this.model.plotsite,
                 SITEUNITS:this.model.siteunits,
                 SALESDATE:"2020-11-01T10:59:31.454Z",
                 HOLDDATE:"2020-11-01T10:59:31.454Z",
                 CROSSPLOT:parseInt(this.model.crossplot),
                 NOTESSUPERUSER:this.model.notessuperuser,
                 NOTESMANAGEMENT:this.model.notesmanagemen,
                 NOTESSALESTEAM:this.model.notessalesteam,
                 PLOTDIMENSION:this.model.plotdimension,
                 FACING:this.model.facing,
                 FACINGSITE:this.model.facingsite,
                 ROADSITE:this.model.roadsite,
                 CORNERPLOT:parseInt(this.model.cornerplot),
                 CORNERPLOTDIMENSIONS:this.model.cornerplotdimensions,
                 PARKSIDEPLOT:parseInt(this.model.parksideplot),
                 SOLDOUT:parseInt(this.model.soldout),
                 ONHOLD:parseInt(this.model.onhold),
                 HOLDDURATIONINDAYS:Number(this.model.holddurationindays),
                 HOLDERIDAGENTID:Number(this.model.holderidagentid),
                 DISPUTE:parseInt(this.model.dispute),
                 DISPUTENOTES:this.model.disputenotes,
                 NOCISSUED:parseInt(this.model.nocissued),
                 NOCCOPY:this.model.noccopy,
                 PLOTSOLDAMOUNT:parseFloat(this.model.plotsoldamount),
                 AMOUNTPAID:parseFloat(this.model.amountpaid),
                 AMOUNTBALANCE:parseFloat(this.model.amountbalance),
                 INSTALMENTS:parseInt(this.model.instalments),
                 INSTALMENTID:Number(this.model.instalmentid),
                 INSTALMENTTERM:this.model.instalmentterm,
                 AGREEMENTDONE:parseInt(this.model.agreementdone),
                 AGREEMENTSCANCOPYLINK:this.model.agreementscancopylink,
                 REGISTRATIONID:Number(this.model.registrationid),
                 REGISTRATIONDONE:parseInt(this.model.registrationdone),
                 REGISTRATIONSCANCOPYLINK:this.model.registrationscancopylink,
                 ITRDONE:parseInt(this.model.itrdone),
                 ITRNO:parseInt(this.model.itrno),
                 RESELL:parseInt(this.model.resell),
                 RESELLID:Number(this.model.resellerid),
                 AGREEMENT:parseInt(this.model.agreement),
                 AGREEMENTID:parseInt(this.model.agreementid),
                 REAGREEMENT:parseInt(this.model.reagreement),
                 REAGREEMENTID:parseInt(this.model.reagreementid),
                }
    this.apiservice.AddProperty(param)
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
