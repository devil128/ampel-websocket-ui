import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StudentInformationComponent} from "./components/student-information/student-information.component";
import {StudentTableComponent} from "./components/student-table/student-table.component";



const routes: Routes = [
  { path: '', component: StudentTableComponent },
  { path: 'student/:user/:place', component: StudentInformationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
