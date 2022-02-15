import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {MacIdentifier} from "../../data/MacIdent";

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
            penalty
          }}
        }
      `,
      fetchPolicy: 'network-only'
    })
    .valueChanges.subscribe((result: any) => {
      let macIdentifiers = [...<MacIdentifier[]>result.data.macs];
      macIdentifiers.sort((a, b) => {
        let aLength = 0;
        if (a && a.penalties && a.penalties.length > 0) {
          aLength = a.penalties[0].penalty;
        }
        return b && b.penalties && b.penalties.length > 0 ? b.penalties[0].penalty - aLength : 0 - aLength;
      })

      this.macIdents = macIdentifiers;
    });
  }

  click(event: MouseEvent, row: MacIdentifier) {
    console.log(row);

    this.router.navigate(["/mac", row.mac]).catch(e => console.error(e));
  }


  getPenaltyScore(macIdent: MacIdentifier, timeframeDays: number): number {
    let res = 0;
    if (macIdent.penalties) {
      const reverse = macIdent.penalties.reverse();
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
