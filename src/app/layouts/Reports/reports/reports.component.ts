import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { observable, Subject, AsyncSubject } from 'rxjs'
import * as jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
@Injectable()
export class ReportsComponent implements OnInit {
  constructor(private router: Router) { }
  public columns: Observable<string>[] = [];
  public rows: any[] = [];
  ngOnInit(): void {
    this.columns = JSON.parse(JSON.stringify(["sadf", "asdfas", "fasfa"]));
    this.rows = [];
    //     setTimeout(() => {
    //  this.downloadAsPDF();
    //     },10000);
  }
  ngAfterViewInit(): void {
    // this.downloadAsPDF();
  }

  public generateReport(Columns: any, Keys: any, Data: any) {
    debugger;
    var object: any; let temprows: any[]; var html = '';
    html = html + '<html><head><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"><link href="/assets/css/Report.css" rel="stylesheet"/></head><body class="container">'
    html = html + '<table id="tblreport" class="table table-striped"><thead><tr>'
    Columns.forEach(element => {
      html = html + '<td>' + element + '</td>'
    });
    html = html + '</tr></thead> <tbody>'

    for (var i = 0; i < Data.length; i++) {
      temprows = [];
      html = html + '<tr>';
      for (var key = 0; key < Keys.length; key++) {
        html = html + '<td>' + Data[i][Keys[key]] + '</td>'
        temprows.push(Data[i][Keys[key]])
      }
      this.rows.push(temprows);
      html = html + '</tr>';
    }
    html = html + '<tbody> </table><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script><script> setTimeout(function () { window.print(); }, 1000);</script></body></html>';
    if (this.rows.length > 0)
      setTimeout(() => {
        this.downloadAsPDF(html);
      }, 2000);
  }

  public downloadAsPDF(html: any) {
    var newWin = window.open('', 'Print-Window');
    newWin.document.open();
    newWin.document.write(html);
    newWin.document.close();
    setTimeout(function () { newWin.close(); }, 1000);

    //setInterval(function() { if (document_focus === true) { win.window.close(); }  }, 300);



    // let doc = new jsPDF();
    // let _elementHandlers =
    // {
    //   '#editor': function (element, renderer) {
    //     return true;
    //   }
    // };
    // doc.fromHTML(html, 15, 15, {
    //   'width': 100,
    //   'elementHandlers': _elementHandlers,
    // });

    // doc.save('test.pdf');



  }

}
