import {Component, OnInit, ViewChild} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {MacIdentifier} from "../../data/MacIdent";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";
import {Page} from "../../data/Page";

@Component({
  selector: 'app-mac-table',
  templateUrl: './mac-table.component.html',
  styleUrls: ['./mac-table.component.scss']
})
export class MacTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['id', 'mac', 'lastupdate', 'penaltyscoretoday', 'penaltyscoreweek'];
  macIdents: Array<MacIdentifier> = []

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
    }, 5000);

  }

  async query() {
    const result : any= await this.apollo
    .query({
      query: gql`
        query getMacLogs($page: Page){
          macs(page: $page){id,mac,timeStamp,penalties {
            penalty,timestamp
          }}
          macsCount
        }
      `,
      variables: {"page": <Page>{from: this.page, size: this.pageSize}},
      fetchPolicy: 'network-only'
    })
    .toPromise()
      let macIdentifiers = [...<MacIdentifier[]>result.data.macs];
      this.queryLength = result.data.macsCount

      this.macIdents = macIdentifiers;

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
    if (macIdent.penalties && macIdent.penalties.length > 0) {
      let penalties =  [...macIdent.penalties].sort((a, b) => Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp));
      for (let i = 0; i < timeframeDays && i < penalties.length; i++) {
        res += penalties[i].penalty;
      }
    }
    return res;
  }


  getDate(timestamp: number): string {
    return new Date(timestamp / 1).toLocaleString();
  }
}
