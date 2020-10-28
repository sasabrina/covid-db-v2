import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../../services/countries.service';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-countries-chart',
  templateUrl: './countries-chart.component.html',
  styleUrls: ['./countries-chart.component.scss']
})

export class CountriesChartComponent implements OnInit {
  isLoading = true;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      position: 'right',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public pieChartLabels: Label[];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: [
        'rgba(255, 0, 0, 0.3)', 
        'rgba(0, 255, 0, 0.3)', 
        'rgba(0, 0, 255, 0.3)',
        'rgba(85, 239, 196, 0.3)', 
        'rgba(116, 186, 255, 0.3)',
        'rgb(162, 155, 254, 0.3)',
        'rgba(253, 121, 168, 0.3)',
        'rgba(214, 48, 49, 0.3)',
        'rgba(225, 112, 85, 0.3)',
        'rgba(253, 203, 110, 0.5)',
      ],
    },
  ];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getData()
  }
  
  getData(): void {
    this.countriesService.getCountries()
    .subscribe((res: any) => {
      if(res){
        this.pieChartLabels = res.map(({name}) => name)
        this.pieChartData = res.map(({infected}) => infected)
        this.isLoading = false
      }
      })
  }
}

