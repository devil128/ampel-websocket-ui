import {FirewallRuleRiskEntry} from "./FirewallRuleRiskEntry";

export interface PenaltyUpdate {
  id: number
  penalty: number
  timeStamp: String
  firewallRuleRiskEntryList: [FirewallRuleRiskEntry]
}
