import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {StudentQuery} from "../../data/StudentQuery";

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss']
})
export class StudentTableComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['username', 'place', 'isFailed', 'isComplete', 'maxTimeBetweenLogs'];
  students: Array<StudentQuery> = []

  constructor(private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: gql`
        {
          users{
            username
            place
            isFailed
            isComplete
            maxTimeBetweenLogs}
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.students = result.data.users;
      console.log(result.data.users);
    });

  }

  click(event: MouseEvent, row: StudentQuery) {
    console.log(row);
  }

}
