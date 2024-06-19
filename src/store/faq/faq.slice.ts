import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IFaqStatuses, initFaqStatuses } from "./faq.statuses";

import { addFaq, deleteFaq, getFaqs, updateFaq } from "./faq.actions";

import { IFaq } from "../../types/faq/faq";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IServerStatus } from "../../types/main/serverStatus";

interface ICoreState {
  faqs: IFaq[];
  serverStatuses: IFaqStatuses;
}

const initialState: ICoreState = {
  faqs: [] as IFaq[],
  serverStatuses: initFaqStatuses(),
};

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {
    setFaqStatuses(state, action: PayloadAction<IFaqStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFaqs.pending, (_state) => {});
    builder.addCase(getFaqs.fulfilled, (state, action) => {
      state.faqs = [];
      state.faqs = action.payload as IFaq[];
    });
    builder.addCase(getFaqs.rejected, (state) => {
      state.faqs = [] as IFaq[];
    });

    builder.addCase(addFaq.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addFaq: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(addFaq.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addFaq: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(addFaq.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addFaq: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(deleteFaq.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteFaq: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteFaq.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteFaq: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteFaq.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteFaq: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateFaq.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateFaq: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updateFaq.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateFaq: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateFaq.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateFaq: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = faqSlice;
