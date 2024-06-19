import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { getPages, updatePage } from "./page.actions";

import { IPage } from "../../types/page/page";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IServerStatus, initServerStatus } from "../../types/main/serverStatus";

interface ICoreState {
  pages: IPage[];
  updatePageStatus: IServerStatus;
}

const initialState: ICoreState = {
  pages: [] as IPage[],
  updatePageStatus: initServerStatus(),
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageStatuses(state, action: PayloadAction<IServerStatus>) {
      state.updatePageStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPages.pending, (_state) => {});
    builder.addCase(getPages.fulfilled, (state, action) => {
      state.pages = [];
      state.pages = action.payload as IPage[];
    });
    builder.addCase(getPages.rejected, (state) => {
      state.pages = [] as IPage[];
    });

    builder.addCase(updatePage.pending, (state) => {
      state.updatePageStatus = {
        status: ServerStatusType.InProgress,
        error: "",
      } as IServerStatus;
    });
    builder.addCase(updatePage.fulfilled, (state, action) => {
      state.updatePageStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      } as IServerStatus;
    });
    builder.addCase(updatePage.rejected, (state) => {
      state.updatePageStatus = {
        status: ServerStatusType.Error,
        error: "server.mistake_try_again",
      } as IServerStatus;
    });
  },
});

export const { actions, reducer } = pageSlice;
