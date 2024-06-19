import { ProposalStatus } from "../../enums/proposalStatus";
import { IProposal } from "./proposal";

export function initProposal(): IProposal {
  const defaults = {
    id: -1,
    name: "",
    profile_id: -1,
    place: "",
    min_price: 0,
    max_price: 100000,
    description: "",
    contact: "",
    status: ProposalStatus.Applyed,
  };

  return {
    ...defaults,
  };
}
