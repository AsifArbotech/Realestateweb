import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../_services/api.service';
import { CustomerTransaction } from '../../../_models/Customers';
import { Graph } from '../../../_models/graph';
import { Chart, ChartDataSets, ChartType , ChartOptions  } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //url = 'http://localhost:61352/api/Transactions/GetAllCustomerTran';
  url = 'http://localhost:61352/api/Graph/GetAllGraphData';
  data: Graph []; 
  barchart = []; 
  Projects = [] ; 
  Properties = []; 
  Bokings = [];
  SalesInvoices = [];
  constructor(private httpClient: HttpClient,
              private apiservice:ApiService,) { }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((re: Graph[]) => {  
      Array.from(re).forEach(x => {  
        this.Projects.push(x.project);  
        this.Properties.push(x.property);  
        this.Bokings.push(x.booking);
        this.SalesInvoices.push(x.salesInvoice);
      });  
      this.barchart = new Chart('canvas', {  
        type: 'bar',  
        data: {  
          labels: this.Bokings,  
          datasets: [  
            {  
              data: this.Projects,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#3cb371",  
                "#0000FF",  
                "#9966FF",  
                "#4C4CFF",  
                "#00FFFF",  
                "#f990a7",  
                "#aad2ed",  
                "#FF00FF",  
                "Blue",  
                "Red",  
                "Blue"  
              ],  
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true  
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      });  
    });  
  }  
}