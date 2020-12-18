import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CustomerTransaction } from '../../../../_models/Customers';
import { ApiService } from '../../../../_services/api.service';
import { NotifierService } from 'angular-notifier';
import {ReportsComponent} from '../../../Reports/reports/reports.component'

//import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
//import * as XLSX from 'xlsx';
declare var jQuery: any;
declare var jsPDF: any; // Important


@Component({
  selector: 'app-customertransaction',
  templateUrl: './customertransaction.component.html',
  styleUrls: ['./customertransaction.component.css']
})
export class CustomerTransactionComponent implements OnInit {

  //@ViewChild('content') content:ElementRef;
  @ViewChild('tableForExcel') tableExcel: ElementRef;
  @ViewChild('pdfTable') pdfTable:ElementRef;

  public Transactionlist: Array<CustomerTransaction> = new Array<CustomerTransaction>();

  page = 1;
  pageSize = 10;

  constructor( private apiservice: ApiService,
    private notifier: NotifierService,
    private reports:ReportsComponent) { }

  ngOnInit(): void {
    this.getTransactionList();
  }

  getTransactionList() {
    this.apiservice.getCustTransaction().subscribe(
      (response: any) => {
        this.Transactionlist = response;
      },
      error => {
        console.log(error);
        this.notifier.notify("error", "Something went wrong");
      }
    )
  }

  getTransactionlistItems() {
    if (this.Transactionlist)
      if (this.Transactionlist.length > this.pageSize) {
        return this.Transactionlist.slice(
          (this.page - 1) * this.pageSize,
          this.page * this.pageSize
        );
      } else {
        return this.Transactionlist;
      }
  }

  DownloadPDF() {
    var columns = [
      { title: "Cust Transaction No", dataKey: "custtransactionno" },
      { title: "Date", dataKey: "createdon" },
      { title: "Project Name", dataKey: "projectname" },
      { title: "Plot No", dataKey: "plotno" },
      { title: "Customer Name", dataKey: "customername" },
      { title: "Amount Paid", dataKey: "amountpaid" },
      { title: "Total Amount", dataKey: "totalamount" },
      { title: "Balance Amount", dataKey: "balanceamount" },
    ];
    var rows = this.getTransactionList();
    var optionsText

    // Only pt supported (not mm or in)
    var doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows, {
      theme: 'striped',
      margin: { top: 60 },
      addPageContent: function (data) {
        var fs = doc.internal.getFontSize();
        doc.setFontSize(12);
        doc.text("Items Report - " + optionsText, 40, 30);
        doc.setFontSize(fs);
      },
      columnStyles: {
        //"Price": { halign: 'right' }
      }
    });
    doc.save('Items.pdf');
  }
 // public SavePDF(): void {  
 //   let content=this.content.nativeElement;  
 //   let doc = new jsPDF();  
 //   let _elementHandlers =  
 //   {  
 //     '#editor':function(element,renderer){  
 //       return true;  
 //     }  
 //   };  
 //   doc.fromHTML(content.innerHTML,15,15,{  
 // 
 //     'width':190,  
 //     'elementHandlers':_elementHandlers  
 //   });  
 // 
 //   doc.save('test.pdf');  
 // }  
  public SavePDF(): boolean {  
    return true;
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  
    doc.fromHTML(document.getElementById("pdfTable").innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('test.pdf');  
  }  
} 

