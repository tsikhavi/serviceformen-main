import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

export interface IPhotoStatuses {
  deletePhoto: IServerStatus;
  getPhotos: IServerStatus;
  updateMainPhoto: IServerStatus;
  updatePhotoStatus: IServerStatus;
}

export function initPhotoStatuses(): IPhotoStatuses {
  const defaults = {
    deletePhoto: initServerStatus(),
    getPhotos: initServerStatus(),
    updateMainPhoto: initServerStatus(),
    updatePhotoStatus: initServerStatus(),
  } as IPhotoStatuses;

  return {
    ...defaults,
  };
}
