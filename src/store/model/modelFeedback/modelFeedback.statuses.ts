import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IModelFeedbackStatuses {
  addModelFeedback: IServerStatus;
  getModelFeedbacks: IServerStatus;
  updateModelFeedbackStatus: IServerStatus;
  deleteModelFeedback: IServerStatus;
}

export function initModelFeedbackStatuses(): IModelFeedbackStatuses {
  const defaults = {
    addModelFeedback: initServerStatus(),
    getModelFeedbacks: initServerStatus(),
    updateModelFeedbackStatus: initServerStatus(),
    deleteModelFeedback: initServerStatus(),
  } as IModelFeedbackStatuses;

  return {
    ...defaults,
  };
}
