import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";

export interface IAdminStatuses {
  login: IServerStatus;
  authMe: IServerStatus;
}

export function initAdminStatuses(): IAdminStatuses {
  const defaults = {
    login: initServerStatus(),
    authMe: initServerStatus(),
  } as IAdminStatuses;

  return {
    ...defaults,
  };
}
