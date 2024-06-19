import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/multypartAxios";

export const uploadCheckPhoto = createAsyncThunk(
  "uploadCheckPhoto",
  async ({ file, model_id, onUploadProgress }: { file: Blob; model_id: number; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("checkPhoto", file);
    formData.append("model_id", String(model_id));
    return await axios
      .post("/upload_check_photo", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);

export const uploadTmpPublicPhoto = createAsyncThunk(
  "uploadTmpPublicPhoto",
  async ({ file, filename, onUploadProgress }: { file: Blob; filename: string; onUploadProgress: Function }) => {
    const formData = new FormData();
    formData.append("publicPhoto", file);
    formData.append("filename", filename);
    return await axios
      .post("/upload_tmp_public_photo", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);

export const uploadPublicPhoto = createAsyncThunk(
  "uploadPublicPhoto",
  async ({ files, filename, model_id }: { files: Blob[]; filename: string; model_id: number }) => {
    const formData = new FormData();
    formData.append("publicPhoto", files[0]);
    formData.append("thumbnail", files[1]);
    formData.append("filename", filename);
    formData.append("model_id", String(model_id));
    return await axios.post("/upload_public_photo", formData).then((response) => response.data);
  }
);

export const uploadPublicVideo = createAsyncThunk(
  "uploadPublicVideo",
  async ({
    file,
    filename,
    model_id,
    onUploadProgress,
  }: {
    file: Blob;
    filename: string;
    model_id: number;
    onUploadProgress: Function;
  }) => {
    const formData = new FormData();
    formData.append("publicVideo", file);
    formData.append("filename", filename);
    formData.append("model_id", String(model_id));
    return await axios
      .post("/upload_public_video", formData, {
        onUploadProgress: (data) => onUploadProgress(data),
      })
      .then((response) => response.data);
  }
);
