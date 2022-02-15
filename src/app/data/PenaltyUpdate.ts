import {FirewallRuleRiskEntry} from "./FirewallRuleRiskEntry";

export interface PenaltyUpdate {
  id: number
  penalty: number
  timestamp: String
  firewallRuleRiskEntryList: [FirewallRuleRiskEntry]
}
