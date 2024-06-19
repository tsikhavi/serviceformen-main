import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IPhotoStatuses, initPhotoStatuses } from "./photo.statuses";

import { deletePhoto, updateMainPhoto, getPhotos, updatePhotoStatus } from "./photo.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus } from "../../../types/main/serverStatus";
import { IPhoto } from "../../../types/model/photo/photo";

interface IPhotoState {
  photos: IPhoto[];
  serverStatuses: IPhotoStatuses;
}

const initialState: IPhotoState = {
  photos: [] as IPhoto[],
  serverStatuses: initPhotoStatuses(),
};

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setPhotoStatuses(state, action: PayloadAction<IPhotoStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateMainPhoto.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateMainPhoto: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updateMainPhoto.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateMainPhoto: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateMainPhoto.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateMainPhoto: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(deletePhoto.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deletePhoto: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deletePhoto.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deletePhoto: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deletePhoto: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.photos = [] as IPhoto[];
      state.photos = action.payload as IPhoto[];
    });
    builder.addCase(getPhotos.rejected, (state) => {
      state.photos = [] as IPhoto[];
    });

    builder.addCase(updatePhotoStatus.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updatePhotoStatus: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updatePhotoStatus.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updatePhotoStatus: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updatePhotoStatus.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updatePhotoStatus: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = photoSlice;
