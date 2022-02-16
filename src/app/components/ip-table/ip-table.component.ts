import {Component, OnInit, ViewChild} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {IpIdent} from "../../data/IpIdent";
import {MacIdentifier} from "../../data/MacIdent";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
import {Page} from "../../data/Page";

@Component({
  selector: 'app-student-table',
  templateUrl: './ip-table.component.html',
  styleUrls: ['./ip-table.component.scss']
})
export class IpTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['id', 'ip', 'lastupdate', 'penaltyscoretoday', 'penaltyscoreweek'];
  ipIdents: Array<IpIdent> = []

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }

  paginator: MatPaginator | null = null;

  pageSize: number = 10;
  page: number = 0;
  queryLength = 100;
  @ViewChild(MatTable) table: MatTable<any> | null = null;

  pageUpdate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.query();
  }

  constructor(private apollo: Apollo, private dateSelector: DateSelectorService, private router: Router) {
    dateSelector.event.subscribe((update) => this.query());
  }


  ngOnInit(): void {
    this.query();
    setInterval(() => {
      this.query();
    }, 10000);

  }

  query() {
    this.apollo
    .watchQuery({
      query: gql`
        query GETIPLOGS($page: Page){
          ips(page: $page){id,ip,timeStamp,penalties {
            penalty,timestamp
          }}
          ipsCounts
        }
      `,
      variables: {"page": <Page>{from: this.page,size: this.pageSize}},
      fetchPolicy: 'network-only'
    })
    .valueChanges.subscribe((result: any) => {
      let ipIdentData = [...<IpIdent[]>result.data.ips];
      this.queryLength = result.data.ipsCounts;
      this.ipIdents = ipIdentData;
    });
  }

  click(event: MouseEvent, row: IpIdent) {
    this.router.navigate(["/ip", row.ip]).catch(e => console.error(e));
  }

  private datesAreOnSameDay(first: Date, second: Date) {
    return first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate();
  }

  private findToday(macIdent: IpIdent): PenaltyUpdate | null {
    let idx = -1;
    let today = new Date();
    for (const penaltyUpdate of macIdent.penalties) {
      if (this.datesAreOnSameDay(today, new Date(Number.parseInt(penaltyUpdate.timestamp))))
        return penaltyUpdate;
    }
    return null;
  }

  getPenaltyScore(ipIdent: IpIdent, timeframeDays: number): number {
    let res = 0;
    if (timeframeDays === 1) {
      const find = this.findToday(ipIdent);
      if (find != null) {
        return find.penalty;
      } else {
        return 0;
      }
    }
    if (ipIdent.penalties && ipIdent.penalties.length > 0) {
      const reverse = [...ipIdent.penalties].reverse();
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
