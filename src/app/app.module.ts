import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MacTableComponent} from "./components/mac-table/mac-table.component";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
//import {MatNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {DateTimePickerComponent} from "./components/data-time-picker/date-time-picker.component";

import {MatSidenavModule} from "@angular/material/sidenav";
import { AppRoutingModule } from './app-routing.module';

import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PenaltyChartComponent} from "./components/penalty-chart/penalty-chart.component";
import {RuleTableComponent} from "./components/rule-table/rule-table.component";
import {NgChartsModule} from "ng2-charts";
import {FormDialogComponent} from "./components/form-dialog/form-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";

import {IpTableComponent} from "./components/ip-table/ip-table.component";
import { DetailInformationComponent } from './components/detail-information/detail-information.component';
import { IntrusionLogComponent } from './components/intrusion-log/intrusion-log.component';
import {PacketfilterLogComponent} from "./components/packetfilter-log/packetfilter-log.component";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    AppComponent,
    MacTableComponent,
    DateTimePickerComponent,
    IpTableComponent,
    PenaltyChartComponent,
    RuleTableComponent,
    FormDialogComponent,
    DetailInformationComponent,
    IntrusionLogComponent,
    PacketfilterLogComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatSidenavModule,
    AppRoutingModule,
    MatChipsModule,
    MatPaginatorModule,
    NgChartsModule,
    MatDialogModule,
    MatMenuModule,


  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
