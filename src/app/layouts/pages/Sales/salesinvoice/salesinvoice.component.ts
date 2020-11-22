import { Component, OnInit } from '@angular/core';
import { Customers } from '../../../../_models/Customers';
import { ApiService } from '../../../../_services/api.service';
import { Project } from '../../../../_models/project';
import { Property } from '../../../../_models/property';
import { Associate } from '../../../../_models/Associate';
import { Salesenquire, Sales, SalesInvoice } from '../../../../_models/Sales';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-salesinvoice',
  templateUrl: './salesinvoice.component.html',
  styleUrls: ['./salesinvoice.component.css']
})
export class SalesinvoiceComponent implements OnInit {
  public salesquatationlist: Array<Sales> = new Array<Sales>();
  public SalesList: Array<Sales> = new Array<Sales>();
  salesinvoice: SalesInvoice = new SalesInvoice();
  ActionType = "Add Sales Invoice";
  page = 1;
  pageSize = 10;
  projectname: String = '';
  unit: String = '';
  customername: String = '';
  associatename: String = '';
  quotationno = '';

  constructor(
    private apiservice: ApiService,
    private notifier: NotifierService
  ) { }

  ngOnInit(): void {
    debugger;
    this.getSalesInvoiceList();
    this.getAllSalesQuatations();
  }

  getSalesInvoiceList() {
    this.apiservice.getSalesInvoiceList().subscribe(
      (response: any) => {
        this.SalesList = response
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getSalesinvoicelistItems() {
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

  Saveinvoice() {
    if (parseInt((<HTMLInputElement>document.getElementById('salesquatationno')).value) == NaN) {
      alert("Invalid Quatation No.");
      return false;
    }
    this.salesinvoice.salesquatationid = this.salesquatationlist.find(f => f.salesquotationno == parseInt((<HTMLInputElement>document.getElementById('salesquatationno')).value)).salesquotationid;
    this.salesinvoice.amount = Number(this.salesinvoice.amount);
    this.apiservice.AddSalesInvoice(this.salesinvoice)
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
          this.clearfields();
          this.getSalesInvoiceList();
        }
      })
  }

  EditSalesinvoice(id) {
    this.ActionType = "Edit Sales Invoice";
    this.GetAllSuggesstion();
    this.apiservice.getSalesInvoiceByID(id).subscribe(
      (response: SalesInvoice) => {
        // response.createdon = new Date(response.createdon.toString().split('T')[0]);
        response.createdon = response.createdon;
        this.salesinvoice = response;
        var obj = this.salesquatationlist.find(f => f.salesquotationid == Number(this.salesinvoice.salesquatationid))
        if (obj) {
          this.projectname = obj.projectname;
          this.unit = obj.plotno;
          this.associatename = obj.consultantname;
          this.customername = obj.customername;
          this.quotationno = obj.salesquotationno.toString();
        }

      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )

    this.ActionType = "Edit Sales Invoice";
  }

  clearfields() {
    this.salesinvoice = new SalesInvoice();
    this.projectname ='';
    this.unit = '';
    this.associatename = '';
    this.customername = '';
    this.quotationno = '';
  }



  GetAllSuggesstion() {
    this.clearfields();
    this.ActionType = "Add Sales Invoice";
  }

  getAllSalesQuatations() {
    this.apiservice.getSalesQuotList().subscribe(
      (response: any) => {
        this.salesquatationlist = response
      },
      error => {
        console.log(error);

      }
    )
  }


  DeleteSalesinvoice(id) {
    if (confirm("Do You wish to Delete the Invoice?")) {
      this.apiservice.DeleteSalesInvoiceByID(id)
        .subscribe((response: any) => {
          if (response) {
            if (response.responseCode == 0) {
              this.notifier.notify("error", response.responseMsg);
            } else if (response.responseCode == 1) {
              this.notifier.notify("success", response.responseMsg);
              this.getSalesInvoiceList();
            }
          }
        })
    }
  }


  getquatationdetails(event: KeyboardEvent) {
    if (parseInt((event.target as HTMLInputElement).value) != NaN) {
     var obj= this.salesquatationlist.find(f => f.salesquotationno == Number((event.target as HTMLInputElement).value))
      if (obj) {
        this.projectname = obj.projectname;
        this.unit = obj.plotno;
        this.associatename = obj.consultantname;
        this.customername = obj.customername;
      }
    }
      
  }



}
