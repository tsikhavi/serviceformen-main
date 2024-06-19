import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFileStatuses, initFileStatuses } from "./file.statuses";

import { uploadCheckPhoto, uploadPublicPhoto, uploadPublicVideo, uploadTmpPublicPhoto } from "./file.actions";
import { IServerStatus } from "../../../types/main/serverStatus";
import { ServerStatusType } from "../../../enums/serverStatusType";

interface IFileState {
  videoProgress: number;
  checkPhotoProgress: number;
  publicPhotoProgress: number;
  serverStatuses: IFileStatuses;
}

const initialState: IFileState = {
  videoProgress: -1,
  checkPhotoProgress: -1,
  publicPhotoProgress: -1,
  serverStatuses: initFileStatuses(),
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFileStatuses(state, action: PayloadAction<IFileStatuses>) {
      state.serverStatuses = action.payload;
    },
    setVideoProgress(state, action: PayloadAction<number>) {
      state.videoProgress = action.payload;
    },
    setCheckPhotoProgress(state, action: PayloadAction<number>) {
      state.checkPhotoProgress = action.payload;
    },
    setPublicPhotoProgress(state, action: PayloadAction<number>) {
      state.publicPhotoProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadCheckPhoto.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadCheckPhoto: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(uploadCheckPhoto.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadCheckPhoto: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(uploadCheckPhoto.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadCheckPhoto: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(uploadTmpPublicPhoto.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadTmpPublicPhoto: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(uploadTmpPublicPhoto.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadTmpPublicPhoto: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(uploadTmpPublicPhoto.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadTmpPublicPhoto: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(uploadPublicPhoto.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicPhoto: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(uploadPublicPhoto.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicPhoto: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(uploadPublicPhoto.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicPhoto: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(uploadPublicVideo.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicVideo: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(uploadPublicVideo.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicVideo: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(uploadPublicVideo.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        uploadPublicVideo: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = fileSlice;
