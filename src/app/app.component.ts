import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ampel-ui-websocket';
  displayedColumns: string[] = ['username', 'place', 'isFailed', 'isComplete', 'maxTimeBetweenLogs'];
  students = []

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

}
