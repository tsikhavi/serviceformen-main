import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";
import adminAxios from "../../../utils/adminAxios";

import { PhotoStatus } from "../../../enums/photoStatus";
import { IPhoto } from "../../../types/model/photo/photo";

export const updateMainPhoto = createAsyncThunk(
  "api/updateMainPhoto",
  async ({ model_id, photo_id }: { model_id: number; photo_id: number }) => {
    return await axios
      .post("/api/update_main_photo", {
        params: {
          model_id: model_id,
          photo_id: photo_id,
        },
      })
      .then((response) => response.data);
  }
);

export const deletePhoto = createAsyncThunk("api/deletePhoto", async ({ photo }: { photo: IPhoto }) => {
  return await axios
    .post("/api/delete_photo", {
      params: {
        photo: photo,
      },
    })
    .then((response) => response.data);
});

export const updatePhotoStatus = createAsyncThunk(
  "api/updatePhotoStatus",
  async ({ photo, status }: { photo: IPhoto; status: PhotoStatus }) => {
    return await adminAxios
      .post("/api/update_photo_status", {
        params: {
          photo: photo,
          status: status,
        },
      })
      .then((response) => response.data);
  }
);

export const getPhotos = createAsyncThunk("api/getPhotos", async () => {
  const response = await adminAxios.get("/api/photos");
  return response.data;
});
