import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addModelServices } from "./modelService.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus } from "src/types/main/serverStatus";

interface IModelServiceState {
  serverStatus: IServerStatus;
}

const initialState: IModelServiceState = {
  serverStatus: {
    status: ServerStatusType.None,
    error: "",
  } as IServerStatus,
};

export const modelServiceSlice = createSlice({
  name: "modelService",
  initialState,
  reducers: {
    setModelServiceStatus(state, action: PayloadAction<IServerStatus>) {
      state.serverStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addModelServices.pending, (state) => {
      state.serverStatus = { status: ServerStatusType.InProgress, error: "" };
    });
    builder.addCase(addModelServices.fulfilled, (state, action) => {
      state.serverStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addModelServices.rejected, (state) => {
      state.serverStatus = {
        status: ServerStatusType.Error,
        error: "",
      };
    });
  },
});

export const { actions, reducer } = modelServiceSlice;
