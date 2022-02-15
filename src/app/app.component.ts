import {Component, OnInit} from '@angular/core';
import {DateSelectorService} from "./data/date-selector.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isScreenSmall: boolean = false;
  path: string = "";

  ngOnInit() {
    window.onresize = () => this.isScreenSmall = window.innerWidth <= 600;
  }
  constructor(private dateSelector: DateSelectorService, private router: Router) {
    this.path = this.router.url;
    this.router.events.subscribe(value => {
        this.path = this.router.url;
    });
  }
  timeStampUpdate(ts: number, type: string) {
    if (type === 'start') {
      this.dateSelector.setFromDate(ts);
    } else {
      this.dateSelector.setToDate(ts);
    }

  }

}
