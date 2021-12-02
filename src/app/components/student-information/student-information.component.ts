import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Apollo, gql} from "apollo-angular";
import {StudentQuery} from "../../data/StudentQuery";
import {DateSelectorService} from "../../data/date-selector.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {LogInterface} from "../../data/LogInterface";

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss']
})
export class StudentInformationComponent implements OnInit, AfterViewInit {
  user: string = "";
  place: string = "";
  student: any;
  activeNetworks = []
  logs = new MatTableDataSource<LogInterface>();
  navigationSubscription;
  displayedColumns: string[] = ['Uhrzeit', 'Erfolg', 'Anzahl der Netzwerke', 'Aktive Netzwerke'];
  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;
  pageSize: number = 10;
  page: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private apollo: Apollo, private dateSelector: DateSelectorService, private router: Router) {
    this.activatedRoute.paramMap.subscribe((param => {
      this.user = param.get("user") !== null ? <string>param.get("user") : "";
      this.place = param.get("place") !== null ? <string>param.get("place") : "";
      this.query();
    }))

    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.query();
      }
    });

  }

  ngAfterViewInit(): void {
    this.logs.paginator = this.paginator;
  }

  query() {
    this.apollo
    .watchQuery({
      query: gql`
        {
          user(username: "${this.user}", place: "${this.place}",from: "${this.dateSelector.getFromDate().getTime()}", to:"${this.dateSelector.getToDate().getTime()}"){
            username,
            place,
            isFailed,
            isComplete,
            maxTimeBetweenLogs,
            logCount,
            activeNetworks
          }
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      console.dir(result);
      this.student = result.data.user;
      console.log(result.data.user);
    });
    this.apollo
    .watchQuery({
      query: gql`
        {
          logs(username: "${this.user}", place: "${this.place}",from: "${this.dateSelector.getFromDate().getTime()}",
            to:"${this.dateSelector.getToDate().getTime()}",
            page: ${this.page}, pageSize: ${this.pageSize}){timestamp,success,networks{network,online}}
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      console.dir(result);
      this.logs = result.data.logs;
    });

  }

  ngOnInit(): void {

  }

  pageUpdate(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.query();
  }

  countNetworks(log: LogInterface): number {
    let sum = 0;
    for(let network of log.networks){
      if(network.online)
        sum += 1;
    }
    return sum;
  }

  activeNetworksOfLog(log: LogInterface): string {
    let result = [];
    for(let network of log.networks){
      if(network.online)
        result.push(network.network);
    }
    return result.toString();
  }

}
