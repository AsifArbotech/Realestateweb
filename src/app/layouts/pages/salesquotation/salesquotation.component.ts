import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../_services/api.service';
import { Salesenquire, Sales, SalesInvoice, SalesQuotation } from '../../../_models/Sales';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-salesquotation',
  templateUrl: './salesquotation.component.html',
  styleUrls: ['./salesquotation.component.css']
})
export class SalesquotationComponent implements OnInit {
   
  public salesenquirelist: Array<Sales> = new Array<Sales>();
  public SalesList: Array<Sales> = new Array<Sales>();
   salesQuotation: SalesQuotation = new SalesQuotation();

   ActionType = "Add Sales Quotation";
   page = 1;
   pageSize = 10;
   projectname: String = '';
   unit: String = '';
   customername: String = '';
   //associatename: String = '';
   enquireno = '';

  constructor( private apiservice: ApiService,
               private notifier: NotifierService) { }

  ngOnInit(): void {
    this.getSalesQuotationList();
    this.getAllSalesEnquires();
  }

  getSalesQuotationList() {
    this.apiservice.getSalesQuotList().subscribe(
      (response: any) => {
        this.SalesList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getSalesQuotationlistItems() {
    if (this.SalesList)
      if (this.SalesList.length > this.pageSize) {
        return this.SalesList.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.SalesList;
      }
  }

  Savequotation() {
    if (parseInt((<HTMLInputElement>document.getElementById('salesenquireno')).value) == NaN) {
      alert("Invalid Enquire No.");
      return false;
    }
    this.salesQuotation.salesenquireid = this.salesenquirelist.find(f => f.salesenquireno == parseInt((<HTMLInputElement>document.getElementById('salesenquireno')).value)).salesenquireid;
    this.salesQuotation.amount = Number(this.salesQuotation.amount);
    this.apiservice.AddSalesQuot(this.salesQuotation)
      .subscribe((response: any) => {
        if (response) {
          if (response.responseCode == 0) {
            this.notifier.notify("error", response.responseMsg);
          } else if (response.responseCode == 1) {
            this.notifier.notify("success", response.responseMsg);
          }
          else {
            this.notifier.notify("error", "Something went wrong");
          }
          this.salesQuotation = new SalesQuotation();
          this.getSalesQuotationList();
        }
      })
  }

  EditSalesquotation(id) {
    this.ActionType = "Edit Sales Quotation";
    this.GetAllSuggesstion();
    this.apiservice.getSalesQuotByID(id).subscribe(
      (response: SalesQuotation) => {
        //response.createdon = new Date(response.createdon.toString().split('T')[0]);
        response.createdon = response.createdon;
        this.salesQuotation = response;
        var obj = this.salesenquirelist.find(f => f.salesenquireid == Number(this.salesQuotation.salesenquireid))
        if (obj) {
          this.projectname = obj.projectname;
          this.unit = obj.plotno;
          this.customername = obj.customername;
          this.enquireno = obj.salesenquireno.toString();
        }

      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )

    this.ActionType = "Edit Sales Quotation";
  }

  DeleteSalesquotation(id) {
    if (confirm("Do You wish to Delete the Invoice?")) {
      this.apiservice.DeleteSalesQuot(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getSalesQuotationList();
            }
          }
        })
    }
  }

  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Sales Quotation";
  }

  getAllSalesEnquires() {
    this.apiservice.getSalesEnquireList().subscribe(
      (response: any) => {
        this.salesenquirelist = response
      },
      error => {
        console.log(error);

      }
    )
  }

  getenquiredetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.salesenquirelist.find(f => f.salesenquireno == Number((event.target as HTMLInputElement).value))
      if (obj) {
        this.projectname = obj.projectname;
        this.unit = obj.plotno;
        //this.associatename = obj.consultantname;
        this.customername = obj.customername;
      }
    }
  }

  clearfields() {
    this.salesQuotation = new SalesQuotation();
    this.projectname ='';
    this.unit = '';
    //this.associatename = '';
    this.customername = '';
    this.enquireno = '';
  }


}
