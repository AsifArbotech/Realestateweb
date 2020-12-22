import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../_services/api.service';
import { Project } from '../../../_models/project';
import { Graph } from '../../../_models/graph';
import { DashboardBox } from '../../../_models/dashboardbox';
import { Chart, ChartDataSets, ChartType , ChartOptions  } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  public dashboardListItems: DashboardBox = new DashboardBox();
  public projectsListItems: Array<Project> = new Array<Project>();
  url = 'http://localhost:61352/api/Graph/GetAllGraphData';
  projectname: String = '';
  data2: DashboardBox [];
  data: Graph []; 
  barchart = []; 
  Projects = [] ; 
  Properties = []; 
  Bokings = [];
  SalesInvoices = [];
  constructor(private httpClient: HttpClient,
              private apiservice:ApiService,) { }

  ngOnInit() {
    this.getDashboardBox();
    this.getProjectsList();
    this.httpClient.get(this.url).subscribe((re: any) => {  
      re.result.forEach(x => {  
        this.Projects.push(x.project);  
        this.Properties.push(x.property);  
        this.Bokings.push(x.booking);
        this.SalesInvoices.push(x.salesInvoice);
      });  
      this.barchart = new Chart('canvas', {  
        type: 'bar',  
        data: {  
         // label: this.Projects,
          datasets: [  
            {  
              barPercentage: 0.3,
              //barThickness: 6,
              //maxBarThickness: 8,
              //minBarLength: 2,
              label: "Projects",
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
            },
            {  
              barPercentage: 0.3,
              label: "Properties",
              data: this.Properties,  
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
            },
            {  
              barPercentage: 0.3,
              label: "Bookings",
              data: this.Bokings,  
              borderColor: '#3cba9f',  
              backgroundColor: [  
                "#42AAAB",  
                "Blue"  
              ],  
              fill: true  
            },
            {  
              barPercentage: 0.3,
              label: "Sales Invoices",
              data: this.SalesInvoices,  
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

  getDashboardBox(){
    this.apiservice.getDashboardBoxdata().subscribe(
      (response: any) => {
        this.dashboardListItems = response.result[0];
      },
      error => {
        console.log(error);

      }
    )
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
}