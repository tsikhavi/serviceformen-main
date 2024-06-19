import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getCaptcha, verifyCaptcha, getPositionsUp } from "./verification.actions";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IServerStatus } from "../../types/main/serverStatus";

interface IVerificationState {
  data: any;
  positionsUpData: any[];
  serverStatus: IServerStatus;
}

const initialState: IVerificationState = {
  data: {} as any,
  positionsUpData: [],
  serverStatus: {
    status: ServerStatusType.None,
    error: "",
  } as IServerStatus,
};

export const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    setProposalStatus(state, action: PayloadAction<IServerStatus>) {
      state.serverStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    
    builder.addCase(getCaptcha.fulfilled, (state, action) => {
      state.data = null;
      state.data = action.payload as any;
    });
    builder.addCase(getCaptcha.rejected, (state) => {
      state.data = null;
    });

    builder.addCase(verifyCaptcha.fulfilled, (state) => {
      state.serverStatus = {
        ...state.serverStatus,
      };
    });
    builder.addCase(verifyCaptcha.rejected, (state) => {
      state.serverStatus = {
        ...state.serverStatus,
      };
    });
    
    builder.addCase(getPositionsUp.fulfilled, (state, action) => {
      state.positionsUpData = [];
      state.positionsUpData = action.payload.data as any[];
    });
    builder.addCase(getPositionsUp.rejected, (state) => {
      state.positionsUpData = [];
    });

  },
});

export const { actions, reducer } = proposalSlice;
