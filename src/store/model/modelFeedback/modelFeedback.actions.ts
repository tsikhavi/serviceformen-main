import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";
import adminAxios from "../../../utils/adminAxios";

import { ModelFeedbackStatus } from "../../../enums/modelFeedbackStatus";
import { IModelFeedback } from "../../../types/model/modelFeedback/modelFeedback";

export const addModelFeedback = createAsyncThunk(
  "api/addModelFeedback",
  async ({ model_feedback }: { model_feedback: IModelFeedback }) => {
    return await axios
      .post("/api/add_model_feedback", {
        params: {
          model_feedback: model_feedback,
        },
      })
      .then((response) => response.data);
  }
);

export const updateModelFeedbackStatus = createAsyncThunk(
  "api/updateModelFeedbackStatus",
  async ({ model_feedback, status }: { model_feedback: IModelFeedback; status: ModelFeedbackStatus }) => {
    return await adminAxios
      .post("/api/update_model_feedback_status", {
        params: {
          model_feedback: model_feedback,
          status: status,
        },
      })
      .then((response) => response.data);
  }
);

export const getModelFeedbacks = createAsyncThunk("api/getModelFeedbacks", async () => {
  const response = await adminAxios.get("/api/model_feedbacks");
  return response.data;
});

export const updateModelFeedbacksView = createAsyncThunk(
  "api/updateModelFeedbacksView",
  async ({ model_id }: { model_id: number }) => {
    return await axios
      .post("/api/update_model_feedbacks_view", {
        params: {
          model_id: model_id,
        },
      })
      .then((response) => response.data);
  }
);

export const deleteModelFeedback = createAsyncThunk(
  "api/deleteModelFeedback",
  async ({ feedback }: { feedback: IModelFeedback }) => {
    return await axios
      .post("/api/delete_model_feedback", {
        params: {
          feedback: feedback,
        },
      })
      .then((response) => response.data);
  }
);
