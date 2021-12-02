import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {DateSelectorService} from "../../data/date-selector.service";

@Component({
  selector: 'app-date-timepicker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent {
  @Input("name")
  name: string = "Datum"
  @Input("timeName")
  timeName: string = "Uhrzeit"
  timeStr: string = ""
  date: Date = new Date(1);

  constructor(private dateSelector: DateSelectorService) {
  }

  set time(time: string) {
    this.timeStr = time;
    this.update();
  }

  get time() {
    return this.timeStr
  }

  @Output("timestamp")
  emitter: EventEmitter<number> = new EventEmitter<number>()

  public onDateChangeEvent(change: MatDatepickerInputEvent<Date>) {
    if (change.value != null) {
      this.date = change.value;
    } else
      this.date = new Date(0);
    this.update();
  }

  public update() {
    let constructedDate = new Date(this.date);
    if (this.timeStr.split(":").length > 1) {
      constructedDate.setMinutes(Number(this.timeStr.split(":")[1]));
      constructedDate.setHours(Number(this.timeStr.split(":")[0]));
    }
    console.dir(constructedDate);
    this.emitter.emit(constructedDate.getTime() * 1000);
  }

}
