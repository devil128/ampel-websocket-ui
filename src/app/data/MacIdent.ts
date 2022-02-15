import {PenaltyUpdate} from "./PenaltyUpdate";

export interface MacIdentifier {
  id: Number
  mac: string
  timeStamp: string
  penalties: [PenaltyUpdate]
}
