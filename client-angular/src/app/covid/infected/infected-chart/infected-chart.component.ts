import { Component, OnInit } from '@angular/core';
import { InfectedService } from '../../../services/infected.service';
import { ChartOptions, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';

@Component({
  selector: 'app-infected-chart',
  templateUrl: './infected-chart.component.html',
  styleUrls: ['./infected-chart.component.scss']
})

export class InfectedChartComponent implements OnInit {
  isLoading = true;
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [{
          ticks: {
              beginAtZero:true
          }
      }]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    }
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(33, 153, 232,0.3)',
      borderColor: '#2199e8',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLabels: Label[] = ['May 19', 'Jun 19', 'Jul 19'];
  public lineChartData: ChartDataSets[] = [
    {data: [], label: "infected"}
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];

  constructor( private infectedService: InfectedService) {
    this.infectedService.listen().subscribe((m: any) => {
      console.log(m)
      this.getData()
    })
  }

  ngOnInit(): void {
    this.getData()
  }
  
  getData(): void {
    this.infectedService.getInfected()
      .subscribe((res: any) => {
        if(res) {
          this.createChartData(res[0])
          this.isLoading = false
        }
      })
  }

  createChartData(data:any){
    const labels = data.map((d: any) => new Date(d.infect_date))
    .sort((a: any, b: any) => a - b)
    .map((d:any) =>moment(d).format("MMM YY"))

    const labelsObj = labels.reduce((prev:any, curr:any) => {
      prev[curr] = prev[curr] + 1 || 1
      return prev
    }, {})
    
    let aux = labels.filter((e: any, i:any) => labels.indexOf(e) === i)
   
    this.lineChartData[0].data = aux.map((a:string) => labelsObj[a])
    this.lineChartLabels = aux
  }

}
