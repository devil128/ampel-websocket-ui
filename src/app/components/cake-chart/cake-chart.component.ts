import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective, ThemeService} from "ng2-charts";
import {ChartInformation} from "../../data/ChartInformation";
import {ChartConfiguration, ChartData, ChartEvent} from "chart.js";
import DataLabelsPlugin from "chartjs-plugin-datalabels";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";

@Component({
  selector: 'app-cake-chart',
  templateUrl: './cake-chart.component.html',
  styleUrls: ['./cake-chart.component.css']
})
export class CakeChartComponent implements OnInit {

  constructor(themeService: ThemeService) {
    console.log(themeService.getColorschemesOptions());
  }

  @Input()
  set dataSet(dataSet: PenaltyUpdate) {
    this.data = dataSet;
    const labels = [];
    const data = [];
    for(const fwEntry of dataSet.firewallRuleRiskEntryList){
      data.push(fwEntry.occurance);
      labels.push(fwEntry.firewallRuleRisk.description);
    }
    this.barChartData = {
      labels: labels,
      datasets: [{data: data}]
    };

  }

  data: PenaltyUpdate | null = {
    penalty: 10,
    firewallRuleRiskEntryList: [{
      firewallRuleRisk: {fwrule: "a", penalty: 1, description: "", sub: "", id: 1},
      occurance: 10
    }],
    id: 1,
    timestamp: "10"
  }

  ngOnInit(): void {
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: false,

    plugins: {
      legend: {
        display: false,

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

  public barChartData: ChartData<'doughnut'> = {labels: ["a"],datasets: [{data: [1]}]};

  public chartClicked({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }

  public chartHovered({event, active}: { event?: ChartEvent, active?: {}[] }): void {
    //console.log(event, active);
  }
}
