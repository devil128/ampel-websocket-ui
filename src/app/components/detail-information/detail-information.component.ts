import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-detail-information',
  templateUrl: './detail-information.component.html',
  styleUrls: ['./detail-information.component.scss']
})
export class DetailInformationComponent implements OnInit {
  mode: string = "ip"
  mac: string = "0";
  ip: string = "0"
  navigationSubscription;

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

  async query() {

    if (this.mode === 'mac') {
      const data = await this.apollo.query({
        query: gql`
          query GETIPLOGS($mac: String){
            ip(ip: $ip){id,ip,penalties { penalty,firewallRuleRiskEntryList {
              firewallRuleRisk {
                penalty,sub,fwrule,description
              }
            }

            },timeStamp}
          }
        `,
        fetchPolicy: 'network-only',
        variables: {mac: this.mac}
      }).toPromise();
    } else {
      const data = await this.apollo.query({
        query: gql`
          query GETIPLOGS($ip: String){
            ip(ip: $ip){id,ip,penalties { penalty,firewallRuleRiskEntryList {
              firewallRuleRisk {
                penalty,sub,fwrule,description
              }
            }

            },timeStamp}
          }
        `,
        fetchPolicy: 'network-only',
        variables: {ip: this.ip}
      }).toPromise();
    }
  }

  ngOnInit(): void {
  }


}
