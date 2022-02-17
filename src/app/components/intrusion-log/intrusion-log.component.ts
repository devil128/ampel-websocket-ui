import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IpLogs} from "../../data/IpLogs";
import {Apollo, gql} from "apollo-angular";
import {Page} from "../../data/Page";
import {Timeframe} from "../../data/Timeframe";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTable} from "@angular/material/table";

@Component({
  selector: 'app-intrusion-log',
  templateUrl: './intrusion-log.component.html',
  styleUrls: ['./intrusion-log.component.css']
})
export class IntrusionLogComponent implements OnInit {
  logs: Array<IpLogs> = [];
  displayedColumns: Array<string> = ["timestamp", "id", "name", "fwrule", "srcmac", "dstmac", "srcip", "dstip"];

  mode: string = "ip"
  mac: string = "0";
  ip: string = "0"
  @Input()
  fromTS: number = new Date(10).getTime()
  @Input()
  toTS: number = Date.now()
  navigationSubscription;

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

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.paramMap.subscribe((param => {
      this.mac = param.get("mac") !== null ? <string>param.get("mac") : "";
      this.ip = param.get("ip") !== null ? <string>param.get("ip") : "";
      if (this.ip === "")
        this.mode = "mac"
      this.query();
    }))

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.query();
      }
    });

  }

  ngOnInit(): void {
    this.query();
  }

  async query() {

    const page: Page = {from: this.page, size: this.pageSize};
    const settings: Timeframe = {
      mode: this.mode,
      ip: this.ip,
      mac: this.mac,
      timestampFrom: this.fromTS,
      timestampTo: this.toTS
    }
    const data: any = await this.apollo.query({
      query: gql`
        query GETIPLOGS($page: Page, $timeframe: Timeframe){
          ipLogs(page: $page,timeframe: $timeframe){timestamp,id,name,fwrule,srcmac,dstmac,srcip,dstip,created}
          ipLogsCount(timeframe: $timeframe)
        }
      `,
      fetchPolicy: 'network-only',
      variables: {page: page, timeframe: settings}
    }).toPromise();
    console.dir(data.data.iplogsCount)

    let logs = [...<IpLogs[]>data.data.ipLogs];
    this.queryLength = data.data.ipLogsCount;
    this.logs = logs;
    console.dir(data.data.ipLogs)
  }

  getDate(timestamp: number): string {
    return new Date(timestamp / 1).toLocaleString();
  }

}
