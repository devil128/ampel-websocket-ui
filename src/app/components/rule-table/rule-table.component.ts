import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Query} from "../../data/Query";
import {DateSelectorService} from "../../data/date-selector.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormDialogComponent} from "../form-dialog/form-dialog.component";
import {FirewallRuleRisk} from "../../data/FirewallRuleRisk";

@Component({
  selector: 'app-rule-table',
  templateUrl: './rule-table.component.html',
  styleUrls: ['./rule-table.component.scss']
})
export class RuleTableComponent implements OnInit {
  title = 'tableOfRules';
  displayedColumns: string[] = ['sub', 'fwrule', 'desc', 'penalty'];
  rules: Array<FirewallRuleRisk> = []

  constructor(private apollo: Apollo, private dateSelector: DateSelectorService, private router: Router, public dialog: MatDialog) {
    dateSelector.event.subscribe((update) => this.query());
  }

  ngOnInit(): void {
    this.rules = [];
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
          fwrules {
            sub
            id
            fwrule
            penalty
            description
          }
        }
      `,
      fetchPolicy: 'network-only'
    })
    .valueChanges.subscribe((result: any) => {
      let fwRules = [...<FirewallRuleRisk[]>result.data.fwrules];
      console.dir(fwRules[0])
      this.rules = fwRules;
      this.rules = this.rules.sort((a, b) => {
        if (a.fwrule === b.fwrule)
          return 0;
        if (a.fwrule == null || b.fwrule == null)
          return -1;
        return a.fwrule.toLowerCase() >= b.fwrule.toLowerCase() ? 1 : -1;
      });
      this.rules = this.rules.sort((a, b) => {
        if (a.sub === b.sub)
          return 0;
        if (a.sub == null || b.sub == null)
          return -1;
        return a.sub.toLowerCase() >= b.sub.toLowerCase() ? 1 : -1;
      });
    });
  }

  changeEl(event: MouseEvent, row: FirewallRuleRisk) {
    const dialogRef = this.dialog.open(FormDialogComponent, {data: row});
    dialogRef.beforeClosed().subscribe(value => {
      console.dir(value);
    })
  }

  newEl(event: MouseEvent) {
    const dialogRef = this.dialog.open(FormDialogComponent, {data: new Query()});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  /*click(event: MouseEvent, row: Query) {
    console.log(row);
    console.dir(["/student", row.username, row.place])

    this.router.navigate(["/student", row.username, row.place]).catch(e => console.error(e));
  }*/


}
