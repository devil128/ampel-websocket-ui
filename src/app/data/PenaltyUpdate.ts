import {FirewallRuleRiskEntry} from "./FirewallRuleRiskEntry";

export interface PenaltyUpdate {
  id: number
  penalty: number
  timestamp: string
  firewallRuleRiskEntryList: [FirewallRuleRiskEntry]
}
