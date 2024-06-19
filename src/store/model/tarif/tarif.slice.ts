import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addTarifs } from "./tarif.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus, initServerStatus } from "../../../types/main/serverStatus";

interface ITarifState {
  serverStatus: IServerStatus;
}

const initialState: ITarifState = {
  serverStatus: initServerStatus(),
};

export const tarifSlice = createSlice({
  name: "tarifs",
  initialState,
  reducers: {
    setTarifStatus(state, action: PayloadAction<IServerStatus>) {
      state.serverStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTarifs.pending, (state) => {
      state.serverStatus = { status: ServerStatusType.InProgress, error: "" };
    });
    builder.addCase(addTarifs.fulfilled, (state, action) => {
      state.serverStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addTarifs.rejected, (state) => {
      state.serverStatus = {
        status: ServerStatusType.Error,
        error: "",
      };
    });
  },
});

export const { actions, reducer } = tarifSlice;
