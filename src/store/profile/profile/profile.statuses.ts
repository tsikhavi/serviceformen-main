import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IProfileStatuses {
  login: IServerStatus;
  register: IServerStatus;
  confirmProfile: IServerStatus;
  authMe: IServerStatus;
  updateProfile: IServerStatus;
  changePassword: IServerStatus;
  deleteProfile: IServerStatus;
  generateToken: IServerStatus;
  restorePassword: IServerStatus;
}

export function initProfileStatuses(): IProfileStatuses {
  const defaults = {
    login: initServerStatus(),
    register: initServerStatus(),
    confirmProfile: initServerStatus(),
    authMe: initServerStatus(),
    updateProfile: initServerStatus(),
    changePassword: initServerStatus(),
    deleteProfile: initServerStatus(),
    generateToken: initServerStatus(),
    restorePassword: initServerStatus(),
  } as IProfileStatuses;

  return {
    ...defaults,
  };
}
