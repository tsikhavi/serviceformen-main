import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IModelStatuses, initModelStatuses } from "./model.statuses";

import {
  addModel,
  deleteModel,
  getModelViews,
  getModels,
  updateModel,
  updateModelByModerator,
  updateModelCurrencyTimezone,
  updateModelEnable,
  updateModelEnableByModerator,
} from "./model.actions";

import { IModel } from "../../../types/model/model/model";
import { initModel } from "../../../types/model/model/initModel";
import { IFilter } from "../../../types/model/filter/filter";
import { initFilter } from "../../../types/model/filter/initFilter";
import { IServerStatus } from "../../../types/main/serverStatus";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { IModelView } from "../../../types/model/modelView/modelView";

interface IModelState {
  activeModelSettingsSection: number;
  model: IModel;
  modelViews: IModelView[];
  models: IModel[];
  filter: IFilter;
  filteredModels: IModel[];
  serverStatuses: IModelStatuses;
}

const initialState: IModelState = {
  activeModelSettingsSection: 0,
  model: initModel(),
  modelViews: [] as IModelView[],
  models: [] as IModel[],
  filteredModels: [] as IModel[],
  filter: initFilter(),
  serverStatuses: initModelStatuses(),
};

export const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setActiveModelSettingsSection(state, action: PayloadAction<number>) {
      state.activeModelSettingsSection = action.payload;
    },
    setModel(state, action: PayloadAction<IModel>) {
      state.model = action.payload;
    },
    setModelStatuses(state, action: PayloadAction<IModelStatuses>) {
      state.serverStatuses = action.payload;
    },
    setFilter(state, action: PayloadAction<IFilter>) {
      state.filter = action.payload;
    },
    setFilteredModels(state, action: PayloadAction<IModel[]>) {
      state.filteredModels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getModels.fulfilled, (state, action) => {
      state.models = [];
      state.models = action.payload as IModel[];
    });
    builder.addCase(getModels.rejected, (state) => {
      state.models = [];
    });

    builder.addCase(getModelViews.fulfilled, (state, action) => {
      state.modelViews = [];
      state.modelViews = action.payload as IModelView[];
    });
    builder.addCase(getModelViews.rejected, (state) => {
      state.modelViews = [];
    });

    builder.addCase(addModel.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModel: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(addModel.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModel: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
      if (action.payload.success && action.payload.model_id) {
        state.model = { ...state.model, id: action.payload.model_id };
      }
    });
    builder.addCase(addModel.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addModel: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateModel.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModel: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModel.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModel: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModel.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModel: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateModelByModerator.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelByModerator: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelByModerator.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelByModerator: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelByModerator.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelByModerator: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateModelEnable.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnable: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelEnable.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnable: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelEnable.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnable: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    
    builder.addCase(updateModelEnableByModerator.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnableByModerator: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelEnableByModerator.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnableByModerator: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelEnableByModerator.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelEnableByModerator: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(updateModelCurrencyTimezone.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelCurrencyTimezone: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelCurrencyTimezone.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelCurrencyTimezone: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateModelCurrencyTimezone.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateModelCurrencyTimezone: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(deleteModel.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModel: {
          status: ServerStatusType.InProgress,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteModel.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModel: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteModel.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteModel: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = modelSlice;
