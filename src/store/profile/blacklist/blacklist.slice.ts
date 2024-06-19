import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IBlacklistStatuses, initBlacklistStatuses } from "./blacklist.statuses";

import { IBlacklist } from "../../../types/profile/blacklist/blacklist";
import { IBlacklistAccess } from "../../../types/profile/blacklist/blacklistAccess";

import {
  addBlacklist,
  addBlacklistAccess,
  deleteBlacklist,
  deleteBlacklistAccess,
  getBlacklist,
  getBlacklistAccess,
} from "./blacklist.actions";
import { IServerStatus } from "../../../types/main/serverStatus";
import { ServerStatusType } from "../../../enums/serverStatusType";

interface IBlacklistState {
  blacklist: IBlacklist[];
  blacklistItem: IBlacklist;
  emptyBlacklistItem: IBlacklist;
  blacklistAccess: IBlacklistAccess[];
  serverStatuses: IBlacklistStatuses;
}

const initialState: IBlacklistState = {
  blacklist: [] as IBlacklist[],
  emptyBlacklistItem: { id: 0, city_id: -1, country_id: -1, phone_number: "", description: "" } as IBlacklist,
  blacklistItem: {} as IBlacklist,
  blacklistAccess: [] as IBlacklistAccess[],
  serverStatuses: initBlacklistStatuses(),
};

export const blacklistSlice = createSlice({
  name: "blacklist",
  initialState,
  reducers: {
    setBlacklistItem(state, action: PayloadAction<IBlacklist>) {
      state.blacklistItem = action.payload;
    },
    setBlacklistStatuses(state, action: PayloadAction<IBlacklistStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlacklist.fulfilled, (state, action) => {
      state.blacklist = [];
      state.blacklist = action.payload as IBlacklist[];
    });
    builder.addCase(getBlacklist.rejected, (state) => {
      state.blacklist = [];
    });

    builder.addCase(addBlacklist.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklist: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(addBlacklist.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklist: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(addBlacklist.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklist: {
          status: ServerStatusType.Error,
          error: "",
        } as IServerStatus,
      };
    });

    builder.addCase(deleteBlacklist.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklist: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteBlacklist.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklist: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteBlacklist.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklist: {
          status: ServerStatusType.Error,
          error: "",
        } as IServerStatus,
      };
    });

    builder.addCase(getBlacklistAccess.fulfilled, (state, action) => {
      state.blacklistAccess = [];
      state.blacklistAccess = action.payload as IBlacklistAccess[];
    });
    builder.addCase(getBlacklistAccess.rejected, (state) => {
      state.blacklistAccess = [];
    });

    builder.addCase(addBlacklistAccess.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklistAccess: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(addBlacklistAccess.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklistAccess: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(addBlacklistAccess.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        addBlacklistAccess: {
          status: ServerStatusType.Error,
          error: "",
        } as IServerStatus,
      };
    });

    builder.addCase(deleteBlacklistAccess.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklistAccess: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteBlacklistAccess.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklistAccess: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteBlacklistAccess.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteBlacklistAccess: {
          status: ServerStatusType.Error,
          error: "",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = blacklistSlice;
