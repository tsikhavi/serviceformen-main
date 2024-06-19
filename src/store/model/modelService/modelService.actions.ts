import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";

import { IModelService } from "../../../types/model/modelService/modelService";

export const addModelServices = createAsyncThunk(
  "api/addModelServices",
  async ({ model_services, model_id }: { model_services: IModelService[]; model_id: number }) => {
    return await axios
      .post("/api/add_model_services", {
        params: {
          model_services: model_services,
          model_id: model_id,
        },
      })
      .then((response) => response.data);
  }
);
