import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {ChartInformation} from "../../data/ChartInformation";

@Component({
  selector: 'app-penalty-chart',
  templateUrl: './penalty-chart.component.html',
  styleUrls: ['./penalty-chart.component.scss']
})
export class PenaltyChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  data: ChartInformation = {
    data: [{
      data: [65, 59, 80, 81, 56, 55, 40], label: 'IP 8.8.8.8',
      backgroundColor: '#E91E63', stack: 'a'
    }], labels: ['1.2', '2.2', '3.2', '4.2', '5.2', '6.2', '7.2']
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white'
        },
        title: {
          display: true,
          text: 'Datum',
          color: 'white'
        },
      },
      y: {
        ticks: {
          color: 'white'
        },
        title: {
          display: true,
          text: 'Score',
          color: 'white'
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'white',
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
    labels: this.data.labels,
    datasets: this.data.data
  };

  constructor() {
  }

  @Input()
  set dataSet(dataSet: ChartInformation) {
    this.data = dataSet
    this.barChartData = {
      labels: this.data.labels,
      datasets: this.data.data
    };
  }

  ngOnInit(): void {
  }

  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

}
