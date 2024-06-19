import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IModelFeedbackStatuses, initModelFeedbackStatuses } from "./modelFeedback.statuses";

import {
  addModelFeedback,
  deleteModelFeedback,
  getModelFeedbacks,
  updateModelFeedbackStatus,
  updateModelFeedbacksView,
} from "./modelFeedback.actions";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IServerStatus } from "../../../types/main/serverStatus";
import { IModelFeedback } from "../../../types/model/modelFeedback/modelFeedback";

interface IModelFeedbackState {
  modelFeedbacks: IModelFeedback[];
  serverStatuses: IModelFeedbackStatuses;
}

const initialState: IModelFeedbackState = {
  modelFeedbacks: [] as IModelFeedback[],
  serverStatuses: initModelFeedbackStatuses(),
};

export const modelfeedbackSlice = createSlice({
  name: "modelFeedback",
  initialState,
  reducers: {
    setModelFeedbackStatuses(state, action: PayloadAction<IModelFeedbackStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addModelFeedback.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModelFeedback: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(addModelFeedback.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModelFeedback: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(addModelFeedback.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModelFeedback: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(getModelFeedbacks.fulfilled, (state, action) => {
      state.modelFeedbacks = [] as IModelFeedback[];
      state.modelFeedbacks = action.payload as IModelFeedback[];
    });
    builder.addCase(getModelFeedbacks.rejected, (state) => {
      state.modelFeedbacks = [] as IModelFeedback[];
    });

    builder.addCase(updateModelFeedbackStatus.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelFeedbackStatus: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelFeedbackStatus.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelFeedbackStatus: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelFeedbackStatus.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelFeedbackStatus: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateModelFeedbacksView.pending, (_state) => {});
    builder.addCase(updateModelFeedbacksView.fulfilled, (_state, _action) => {});
    builder.addCase(updateModelFeedbacksView.rejected, (_state) => {});

    builder.addCase(deleteModelFeedback.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModelFeedback: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteModelFeedback.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModelFeedback: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteModelFeedback.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModelFeedback: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = modelfeedbackSlice;
