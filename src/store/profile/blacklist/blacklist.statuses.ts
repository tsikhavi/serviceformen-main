import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IBlacklistStatuses {
  addBlacklistAccess: IServerStatus;
  deleteBlacklistAccess: IServerStatus;
  addBlacklist: IServerStatus;
  deleteBlacklist: IServerStatus;
}

export function initBlacklistStatuses(): IBlacklistStatuses {
  const defaults = {
    addBlacklistAccess: initServerStatus(),
    deleteBlacklistAccess: initServerStatus(),
    addBlacklist: initServerStatus(),
    deleteBlacklist: initServerStatus(),
  } as IBlacklistStatuses;

  return {
    ...defaults,
  };
}
