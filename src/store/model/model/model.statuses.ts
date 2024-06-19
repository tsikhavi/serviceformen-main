import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IModelStatuses {
  addModel: IServerStatus;
  updateModel: IServerStatus;
  updateModelByModerator: IServerStatus;
  deleteModel: IServerStatus;
  updateModelEnable: IServerStatus;
  updateModelEnableByModerator: IServerStatus;
  updateModelCurrencyTimezone: IServerStatus;
}

export function initModelStatuses(): IModelStatuses {
  const defaults = {
    addModel: initServerStatus(),
    updateModel: initServerStatus(),
    updateModelByModerator: initServerStatus(),
    deleteModel: initServerStatus(),
    updateModelEnable: initServerStatus(),
    updateModelEnableByModerator: initServerStatus(),
    updateModelCurrencyTimezone: initServerStatus(),
  } as IModelStatuses;

  return {
    ...defaults,
  };
}
