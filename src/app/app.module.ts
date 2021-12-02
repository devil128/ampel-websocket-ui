import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {StudentTableComponent} from "./components/student-table/student-table.component";
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
import { StudentInformationComponent } from './components/student-information/student-information.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    AppComponent,
    StudentTableComponent,
    DateTimePickerComponent,
    StudentInformationComponent
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


    ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
