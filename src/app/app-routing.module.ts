import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {MacTableComponent} from "./components/mac-table/mac-table.component";

import {IpTableComponent} from "./components/ip-table/ip-table.component";
import {PenaltyChartComponent} from "./components/penalty-chart/penalty-chart.component";
import {RuleTableComponent} from "./components/rule-table/rule-table.component";
import {DetailInformationComponent} from "./components/detail-information/detail-information.component";



const routes: Routes = [
  { path: '', component: MacTableComponent },
  { path: 'mac/:mac', component: DetailInformationComponent },
  { path: 'ip/:ip', component: DetailInformationComponent },
  { path: 'ip', component: IpTableComponent },
  { path: 'rules', component: RuleTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
