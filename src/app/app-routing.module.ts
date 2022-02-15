import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import {StudentTableComponent} from "./components/student-table/student-table.component";

import {IpTableComponent} from "./components/ip-table/ip-table.component";
import {PenaltyChartComponent} from "./components/penalty-chart/penalty-chart.component";
import {RuleTableComponent} from "./components/rule-table/rule-table.component";
import {DetailInformationComponent} from "./components/detail-information/detail-information.component";



const routes: Routes = [
  { path: '', component: StudentTableComponent },
  { path: 'mac/:mac', component: DetailInformationComponent },
  { path: 'ip/:ip', component: DetailInformationComponent },
  { path: 'ip', component: IpTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
