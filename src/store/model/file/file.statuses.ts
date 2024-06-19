import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IFileStatuses {
  uploadCheckPhoto: IServerStatus;
  uploadPublicPhoto: IServerStatus;
  uploadPublicVideo: IServerStatus;
  uploadTmpPublicPhoto: IServerStatus;
}

export function initFileStatuses(): IFileStatuses {
  const defaults = {
    uploadCheckPhoto: initServerStatus(),
    uploadPublicPhoto: initServerStatus(),
    uploadPublicVideo: initServerStatus(),
    uploadTmpPublicPhoto: initServerStatus(),
  } as IFileStatuses;

  return {
    ...defaults,
  };
}
