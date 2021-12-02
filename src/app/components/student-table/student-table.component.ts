import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {StudentQuery} from "../../data/StudentQuery";
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['username', 'place', 'isFailed', 'isComplete', 'maxTimeBetweenLogs'];
  students: Array<StudentQuery> = []

  constructor(private apollo: Apollo, private dateSelector: DateSelectorService, private router: Router) {

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
          users(from: "${this.dateSelector.getFromDate().getTime()}"
            to: "${this.dateSelector.getToDate().getTime()}"){
            username
            place
            isFailed
            isComplete
            timeOnline
            maxTimeBetweenLogs}
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      let students = [...<StudentQuery[]>result.data.users];
      this.students = students.sort((a, b) => {
        if (a.username === b.username)
          return 0;
        if (a.username == null || b.username == null)
          return -1;
        return a.username.toLowerCase() >= b.username.toLowerCase() ? 1 : -1;
      })
      this.students = students.sort((a, b) => {
        return (a.isFailed === b.isFailed) ? 0 : a.isFailed ? -1 : 1;
      })

      console.log(result.data.users);
    });
  }

  click(event: MouseEvent, row: StudentQuery) {
    console.log(row);
    console.dir(["/student", row.username, row.place])

    this.router.navigate(["/student", row.username, row.place]).catch(e => console.error(e));
  }

  timeStampUpdate(ts: number, type: string) {
    console.log(ts);
    if (type === 'start') {
      this.dateSelector.setFromDate(ts);
    } else {
      this.dateSelector.setToDate(ts);
    }
    this.query();
  }

}
