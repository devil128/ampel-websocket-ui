import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

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

  set time(time: string) {
    this.timeStr = time;
  }
  get time(){
    return this.timeStr
  }

  @Output("timestamp")
  emitter: EventEmitter<number> = new EventEmitter<number>()

  constructor() {

  }


}
