import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IVideoStatuses, initVideoStatuses } from "./video.statuses";

import { deleteVideo, getVideos, updateVideoStatus } from "./video.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus } from "../../../types/main/serverStatus";
import { IVideo } from "../../../types/model/video/video";

interface IVideoState {
  videos: IVideo[];
  serverStatuses: IVideoStatuses;
}

const initialState: IVideoState = {
  videos: [] as IVideo[],
  serverStatuses: initVideoStatuses(),
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoStatuses(state, action: PayloadAction<IVideoStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteVideo.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteVideo: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteVideo: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteVideo.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteVideo: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(getVideos.fulfilled, (state, action) => {
      state.videos = [] as IVideo[];
      state.videos = action.payload as IVideo[];
    });
    builder.addCase(getVideos.rejected, (state) => {
      state.videos = [] as IVideo[];
    });

    builder.addCase(updateVideoStatus.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateVideoStatus: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updateVideoStatus.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateVideoStatus: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateVideoStatus.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateVideoStatus: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = videoSlice;
