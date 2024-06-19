import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";
import adminAxios from "../../../utils/adminAxios";

import { IModel } from "../../../types/model/model/model";

export const getModels = createAsyncThunk("api/getModels", async ({ profile_id }: { profile_id: number }) => {
  const response = await axios.get("/api/models", {
    params: {
      profile_id: profile_id,
    },
  });
  return response.data;
});

export const getModelsAgency = createAsyncThunk("api/getModelsAgency", async ({ profile_id }: { profile_id: number }) => {
  const response = await axios.get("/api/models_agency", {
    params: {
      profile_id: profile_id,
    },
  });
  return response.data;
});

export const getModelsAdmin = createAsyncThunk("api/getModelsAdmin", async ({ profile_id }: { profile_id: number }) => {
  const response = await axios.get("/api/models_admin", {
    params: {
      profile_id: profile_id,
    },
  });
  return response.data;
});

export const addModel = createAsyncThunk("api/addModel", async ({ model }: { model: IModel }) => {
  return await axios
    .post("/api/add_model", {
      params: {
        model: model,
      },
    })
    .then((response) => response.data);
});

export const updateModel = createAsyncThunk("api/updateModel", async ({ model }: { model: IModel }) => {
  return await axios
    .post("/api/update_model", {
      params: {
        model: model,
      },
    })
    .then((response) => response.data);
});

export const updateModelByModerator = createAsyncThunk("api/updateModelByModerator", async ({ model }: { model: IModel }) => {
  return await adminAxios
    .post("/api/update_model", {
      params: {
        model: model,
      },
    })
    .then((response) => response.data);
});

export const updateModelEnable = createAsyncThunk(
  "api/updateModelEnable",
  async ({ model_id, is_enable }: { model_id: number; is_enable: boolean }) => {
    return await axios
      .post("/api/update_model_enable", {
        params: {
          model_id: model_id,
          is_enable: is_enable,
        },
      })
      .then((response) => response.data);
  }
);

export const updateModelEnableByModerator = createAsyncThunk(
  "api/updateModelEnableByModerator",
  async ({ model_id, is_enable_by_moderator }: { model_id: number; is_enable_by_moderator: boolean }) => {
    return await adminAxios
      .post("/api/update_model_enable_by_moderator", {
        params: {
          model_id: model_id,
          is_enable_by_moderator: is_enable_by_moderator,
        },
      })
      .then((response) => response.data);
  }
);

export const updateModelCurrencyTimezone = createAsyncThunk(
  "api/updateModelCurrencyTimezone",
  async ({ model_id, currency_id, time_zone }: { model_id: number; currency_id: number; time_zone: number }) => {
    return await axios
      .post("/api/update_model_currency_timezone", {
        params: {
          model_id: model_id,
          currency_id: currency_id,
          time_zone: time_zone,
        },
      })
      .then((response) => response.data);
  }
);

export const deleteModel = createAsyncThunk("api/deleteModel", async ({ model }: { model: IModel }) => {
  return await axios
    .post("/api/delete_model", {
      params: {
        model_id: model.id,
        photos: model.photos,
        videos: model.videos,
      },
    })
    .then((response) => response.data);
});

export const addModelView = createAsyncThunk("api/addModelView", async ({ model_id }: { model_id: number }) => {
  return await axios
    .post("/api/add_model_view", {
      params: {
        model_id: model_id,
      },
    })
    .then((response) => response.data);
});

export const getModelViews = createAsyncThunk("api/getModelViews", async ({ model_id }: { model_id: number }) => {
  const response = await axios.get("/api/model_views", {
    params: {
      model_id: model_id,
    },
  });
  return response.data;
});
