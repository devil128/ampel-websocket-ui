import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Query} from "../../data/Query";
import {FirewallRuleRisk} from "../../data/FirewallRuleRisk";
import {Apollo, gql} from "apollo-angular";

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

  sub: string = "";
  fwRule: string = "";
  description: string = "";
  penalty: number = 1;
  isDisabled: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public row: FirewallRuleRisk, private apollo: Apollo) {
    if (row.sub === "" && row.fwrule === "") {
      this.isDisabled = false;
      this.sub = "Sub";
      this.fwRule = "Firewall rule";
    } else {
      this.isDisabled = true;
      this.sub = row.sub;
      this.fwRule = row.fwrule;
    }
    this.description = row.description;
    this.penalty = row.penalty;
  }

  async sendNewData() {

    let row;
    if (this.isDisabled) {
      row = {id: this.row.id, penalty: this.penalty, description: this.row.description, sub: this.sub, fwrule: this.row.fwrule}
    } else {
      row = {id: 0, penalty: this.penalty, description: this.description, sub: this.sub, fwrule: this.fwRule};
    }
    const res = await this.apollo.mutate({
      mutation: gql`
        mutation updateFWRules($rule: FirewallRuleRiskInput){
          uploadFwRule(rule: $rule)
        }
      `,
      variables: {"rule": row}
    }).toPromise();
    console.log("Send successful");

  }

  ngOnInit(): void {
  }

}
