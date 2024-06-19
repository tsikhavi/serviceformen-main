import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";

import { IWorkTime } from "../../../types/model/workTime/workTime";

export const addWorkTimes = createAsyncThunk(
  "api/addWorkTimes",
  async ({ work_times, model_id }: { work_times: IWorkTime[]; model_id: number }) => {
    return await axios
      .post("/api/add_work_times", {
        params: {
          work_times: work_times,
          model_id: model_id,
        },
      })
      .then((response) => response.data);
  }
);
