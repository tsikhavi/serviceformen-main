import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";
import adminAxios from "../../../utils/adminAxios";

import { VideoStatus } from "../../../enums/videoStatus";
import { IVideo } from "../../../types/model/video/video";

export const deleteVideo = createAsyncThunk("api/deleteVideo", async ({ video }: { video: IVideo }) => {
  return await axios
    .post("/api/delete_video", {
      params: {
        video: video,
      },
    })
    .then((response) => response.data);
});

export const updateVideoStatus = createAsyncThunk(
  "api/updateVideoStatus",
  async ({ video, status }: { video: IVideo; status: VideoStatus }) => {
    return await adminAxios
      .post("/api/update_video_status", {
        params: {
          video: video,
          status: status,
        },
      })
      .then((response) => response.data);
  }
);

export const getVideos = createAsyncThunk("api/getVideos", async () => {
  const response = await adminAxios.get("/api/videos");
  return response.data;
});
