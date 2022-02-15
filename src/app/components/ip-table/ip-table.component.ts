import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {StudentQuery} from "../../data/StudentQuery";
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {MacIdentifier} from "../../data/MacIdent";
import {IpIdent} from "../../data/IpIdent";

@Component({
  selector: 'app-student-table',
  templateUrl: './ip-table.component.html',
  styleUrls: ['./ip-table.component.scss']
})
export class IpTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['id', 'ip', 'lastupdate', 'penaltyscoretoday', 'penaltyscoreweek'];
  ipIdents: Array<IpIdent> = []

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
          ips(page: {from: 0, size: 100}){id,ip,timeStamp,penalties {
            penalty
          }}
        }
      `,
      fetchPolicy: 'network-only'
    })
    .valueChanges.subscribe((result: any) => {
      let ipIdentData = [...<IpIdent[]>result.data.ips];
      this.ipIdents = ipIdentData;
    });
  }

  click(event: MouseEvent, row: IpIdent) {
    console.log(row);
    this.router.navigate(["/ip", row.ip]).catch(e => console.error(e));
  }


  getPenaltyScore(ipIdent: IpIdent, timeframeDays: number): number {
    let res = 0;
    if (ipIdent.penalties) {
      const reverse = ipIdent.penalties.reverse();
      for (let i = 0; i < timeframeDays && i < reverse.length; i++) {
        res += reverse[i].penalty;
      }
    }
    return res;
  }


  getDate(timestamp: number): string {
    console.log(timestamp)
    return new Date(timestamp / 1).toLocaleString();
  }
}
