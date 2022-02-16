import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, ChartData, ChartEvent, Color} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";

@Component({
  selector: 'app-cake-chart',
  templateUrl: './cake-chart.component.html',
  styleUrls: ['./cake-chart.component.css']
})
export class CakeChartComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  colors = [{backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]}];

  data: PenaltyUpdate | null = {
    penalty: 10,
    firewallRuleRiskEntryList: [{
      firewallRuleRisk: {fwrule: "a", penalty: 1, description: "", sub: "", id: 1},
      occurance: 10
    }],
    id: 1,
    timestamp: "10"
  }

  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    layout: {
      autoPadding: true
    },
    plugins: {
      legend: {
        //legend above chart
        display: false,
      },
      datalabels: {
        //labels right next to chart fields
        display: false
      },
    },
  };

  public doughnutChartPlugins = [
    DataLabelsPlugin
  ];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: ["a"],
    datasets: [{
      data: [1],
      backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
    }],
  };

  constructor() {
  }


  @Input()
  set dataSet(dataSet: PenaltyUpdate) {
    this.data = dataSet;
    const labels = [];
    const data = [];
    for (const fwEntry of dataSet.firewallRuleRiskEntryList) {
      data.push(fwEntry.occurance);
      labels.push(fwEntry.firewallRuleRisk.fwrule + " | " + fwEntry.firewallRuleRisk.description);
    }
    this.doughnutChartData = {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
        hoverBackgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"],
        hoverBorderColor: 'white',
        hoverBorderWidth: 5
      }]
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
