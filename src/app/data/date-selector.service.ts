import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateSelectorService {
  from: number = -1;
  to: number = -1;

  constructor() {
  }

  public getFromDate(): Date {
    if (this.from == -1) {
      return new Date(1);
    }
    return new Date(this.from / 1000);
  }

  public getToDate(): Date {
    if (this.to == -1) {
      return new Date();
    }
    return new Date(this.to / 1000);
  }

  public setFromDate(millis: number) {
    this.from = millis;
  }

  public setToDate(millis: number) {
    this.to = millis;
  }
}
