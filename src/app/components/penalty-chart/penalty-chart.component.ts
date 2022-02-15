import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, ThemeService} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {DataEntry} from "../../data/DataEntry";
import {ChartInformation} from "../../data/ChartInformation";

@Component({
  selector: 'app-penalty-chart',
  templateUrl: './penalty-chart.component.html',
  styleUrls: ['./penalty-chart.component.scss']
})
export class PenaltyChartComponent implements OnInit {

  constructor(themeService: ThemeService) {
    console.log(themeService.getColorschemesOptions());
  }

  @Input()
  dataSet: ChartInformation = {
    data: [{
      data: [65, 59, 80, 81, 56, 55, 40], label: 'IP 8.8.8.8',
      backgroundColor: '#E91E63', stack: 'a'
    }], labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012']
  }

  ngOnInit(): void {
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white'
        }
      },
      y: {
        min: 10,
        ticks: {
          color: 'white'
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white'
        },
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'white',
      }
    }
  };
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.dataSet.labels,
    datasets: this.dataSet.data
  };

  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}
