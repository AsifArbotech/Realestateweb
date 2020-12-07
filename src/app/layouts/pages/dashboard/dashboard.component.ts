import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../_services/api.service';
import { CustomerTransaction } from '../../../_models/Customers'
import { Chart, ChartDataSets, ChartType , ChartOptions  } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url = 'http://localhost:61352/api/Transactions/GetAllCustomerTran';
  data: CustomerTransaction[]; 
  barchart = []; 
  Player = []; 
  Run = []; 
  CustomerName= [];
  constructor(private httpClient: HttpClient,
              private apiservice:ApiService,) { }

  ngOnInit() {
    this.httpClient.get(this.url).subscribe((result: CustomerTransaction[]) => {  
      result.forEach(x => {  
        this.Player.push(x.totalamount);  
        this.Run.push(x.balanceamount);  
        this.CustomerName.push(x.customername)
      });  
      this.barchart = new Chart('canvas', {  
        type: 'bar',  
        data: {  
          labels: this.CustomerName,  
          datasets: [  
            {  
              data: this.Run,  
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