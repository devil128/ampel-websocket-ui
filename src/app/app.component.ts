import {Component, OnInit} from '@angular/core';
import {DateSelectorService} from "./data/date-selector.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isScreenSmall: boolean = false;

  ngOnInit() {
    window.onresize = () => this.isScreenSmall = window.innerWidth <= 600;
  }
  constructor(private dateSelector: DateSelectorService) {
  }
  timeStampUpdate(ts: number, type: string) {
    if (type === 'start') {
      this.dateSelector.setFromDate(ts);
    } else {
      this.dateSelector.setToDate(ts);
    }

  }

}
