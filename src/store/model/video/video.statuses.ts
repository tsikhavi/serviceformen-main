import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IVideoStatuses {
  deleteVideo: IServerStatus;
  getVideos: IServerStatus;
  updateVideoStatus: IServerStatus;
}

export function initVideoStatuses(): IVideoStatuses {
  const defaults = {
    deleteVideo: initServerStatus(),
    getVideos: initServerStatus(),
    updateVideoStatus: initServerStatus(),
  } as IVideoStatuses;

  return {
    ...defaults,
  };
}
