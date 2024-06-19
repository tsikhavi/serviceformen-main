import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addWorkTimes } from "./workTime.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus } from "src/types/main/serverStatus";

interface IWorkTimeState {
  serverStatus: IServerStatus;
}

const initialState: IWorkTimeState = {
  serverStatus: {
    status: ServerStatusType.None,
    error: "",
  } as IServerStatus,
};

export const workTimeSlice = createSlice({
  name: "workTimes",
  initialState,
  reducers: {
    setWorkTimeStatus(state, action: PayloadAction<IServerStatus>) {
      state.serverStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addWorkTimes.pending, (state) => {
      state.serverStatus = { status: ServerStatusType.InProgress, error: "" };
    });
    builder.addCase(addWorkTimes.fulfilled, (state, action) => {
      state.serverStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addWorkTimes.rejected, (state) => {
      state.serverStatus = {
        status: ServerStatusType.Error,
        error: "",
      };
    });
  },
});

export const { actions, reducer } = workTimeSlice;
