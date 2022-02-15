import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {PenaltyUpdate} from "../../data/PenaltyUpdate";
import {MacIdentifier} from "../../data/MacIdent";
import {IpIdent} from "../../data/IpIdent";
import {ChartInformation} from "../../data/ChartInformation";
import {DataEntry} from "../../data/DataEntry";

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
  penalties: Array<PenaltyUpdate> | null = null;
  dataset: ChartInformation | null = null;
  datasetweek: ChartInformation | null = null;

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
      const data: any = await this.apollo.query({
        query: gql`
          query GetMacLogs($mac: String){
            mac(mac: $mac){id,mac,timeStamp,penalties { penalty,timestamp,firewallRuleRiskEntryList {
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
      console.dir(data.data.mac);
      const macIdent: MacIdentifier = data.data.mac;
      this.penalties = macIdent.penalties;
      this.updateChart();
    } else {
      const data: any = await this.apollo.query({
        query: gql`
          query GetIpLogs($ip: String){
            ip(ip: $ip){id,ip,timeStamp,penalties{ penalty,timestamp,firewallRuleRiskEntryList {
              firewallRuleRisk {
                penalty,sub,fwrule,description}
            }}}
          }
        `,
        fetchPolicy: 'network-only',
        variables: {ip: this.ip}
      }).toPromise();
      console.dir(data.data.ip);
      const ipIdent: IpIdent = data.data.ip;
      this.penalties = ipIdent.penalties;
      this.updateChart();
    }
  }

  public updateChart(): void {
    const data: Array<number> = [];
    const labels: Array<string> = [];
    if (this.penalties != null) {
      for (const penaltyUpdate of this.penalties) {
        console.dir(penaltyUpdate);
        data.push(penaltyUpdate.penalty);
        labels.push(penaltyUpdate.timestamp + "")
      }
    }
    this.dataset = {data: [{data: data, stack: "a", label: "Penalties", backgroundColor: "#E91E63"}], labels: labels};
  }

  ngOnInit(): void {
  }


}
