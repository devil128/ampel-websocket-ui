import {PenaltyUpdate} from "./PenaltyUpdate";

export interface IpIdent {
  id: Number
  ip: string
  timeStamp: string
  penalties: [PenaltyUpdate]
}
