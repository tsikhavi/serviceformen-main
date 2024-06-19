import { ServerStatusType } from "../../enums/serverStatusType";

export interface IServerStatus {
  status: ServerStatusType;
  error: string;
}

export function initServerStatus(): IServerStatus {
  const defaults = {
    status: ServerStatusType.None,
    error: "",
  } as IServerStatus;

  return {
    ...defaults,
  };
}
