import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";

export interface IFaqStatuses {
  addFaq: IServerStatus;
  deleteFaq: IServerStatus;
  updateFaq: IServerStatus;
}

export function initFaqStatuses(): IFaqStatuses {
  const defaults = {
    addFaq: initServerStatus(),
    deleteFaq: initServerStatus(),
    updateFaq: initServerStatus(),
  } as IFaqStatuses;

  return {
    ...defaults,
  };
}
