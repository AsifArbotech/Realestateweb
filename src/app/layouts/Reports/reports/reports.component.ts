import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core';
//import {jsPDF} from 'jspdf';
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  @ViewChild('pdfTable') pdfTable: ElementRef;
  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
 this.downloadAsPDF();
    },10000);
  }
  ngAfterViewInit():void{
   // this.downloadAsPDF();
  }

  public downloadAsPDF() {
    debugger;
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const margins = {
      top: 0,
      bottom: 0,
      left: 0,
      width: 100
    };
    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML("<h1>Dhoom</h1>", 15, 15, {'width': 170,
          'elementHandlers': true
  });
 
  doc.save('sample-file.pdf');

   

  }

}
