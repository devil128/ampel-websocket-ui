import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {MacIdentifier} from "../../data/MacIdent";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";

@Component({
  selector: 'app-mac-table',
  templateUrl: './mac-table.component.html',
  styleUrls: ['./mac-table.component.scss']
})
export class MacTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['id', 'mac', 'lastupdate', 'penaltyscoretoday', 'penaltyscoreweek'];
  macIdents: Array<MacIdentifier> = []

  constructor(private apollo: Apollo, private dateSelector: DateSelectorService, private router: Router) {
    dateSelector.event.subscribe((update) => this.query());
  }

  ngOnInit(): void {
    this.query();
    setInterval(() => {
      this.query();
    }, 5000);

  }

  query() {
    this.apollo
    .watchQuery({
      query: gql`
        {
          macs(page: {from: 0, size: 100}){id,mac,timeStamp,penalties {
            penalty,timestamp
          }}
        }
      `,
      fetchPolicy: 'network-only'
    })
    .valueChanges.subscribe((result: any) => {
      let macIdentifiers = [...<MacIdentifier[]>result.data.macs];


      this.macIdents = macIdentifiers;
    });
  }

  private datesAreOnSameDay(first: Date, second: Date) {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  private findToday(macIdent: MacIdentifier): PenaltyUpdate | null {
    let idx = -1;
    let today = new Date();
    for (const penaltyUpdate of macIdent.penalties) {
      if (this.datesAreOnSameDay(today, new Date(Number.parseInt(penaltyUpdate.timestamp))))
        return penaltyUpdate;
    }
    return null;
  }

  click(event: MouseEvent, row: MacIdentifier) {
    console.log(row);

    this.router.navigate(["/mac", row.mac]).catch(e => console.error(e));
  }


  getPenaltyScore(macIdent: MacIdentifier, timeframeDays: number): number {
    let res = 0;
    if (timeframeDays === 1) {
      const find = this.findToday(macIdent);
      if (find != null) {
        return find.penalty;
      } else {
        return 0;
      }
    }

    if (macIdent.penalties) {
      const reverse = [...macIdent.penalties].reverse();
      for (let i = 0; i < timeframeDays && i < reverse.length; i++) {
        res += reverse[i].penalty;
      }
    }
    return res;
  }


  getDate(timestamp: number): string {
    return new Date(timestamp / 1).toLocaleString();
  }
}
