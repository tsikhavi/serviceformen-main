import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IAdminStatuses, initAdminStatuses } from "./admin.statuses";

import { authMeAdmin, loginAdmin } from "./admin.actions";

import { IUser } from "../../types/user/user";
import { IServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";

interface IAdminState {
  user: IUser;
  isAuth: boolean;
  serverStatuses: IAdminStatuses;
}

const initialState: IAdminState = {
  user: { id: -1 } as IUser,
  isAuth: false,
  serverStatuses: initAdminStatuses(),
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logoutAdmin: (state) => {
      state.user = {} as IUser;
      state.isAuth = false;
      window.localStorage.removeItem("esco_token_admin");
    },
    setAdminStatuses(state, action: PayloadAction<IAdminStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
      if (action.payload.token) {
        state.user = action.payload as IUser;
        window.localStorage.setItem("esco_token_admin", action.payload.token);
        state.serverStatuses = state.serverStatuses = {
          ...state.serverStatuses,
          authMe: {
            status: ServerStatusType.Success,
            error: "",
          } as IServerStatus,
        };
        state.isAuth = true;
      }
    });
    builder.addCase(loginAdmin.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
      state.user = {} as IUser;
    });

    builder.addCase(authMeAdmin.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
      state.isAuth = false;
    });
    builder.addCase(authMeAdmin.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
      if (action.payload.success) {
        state.user = action.payload.user as IUser;
        if (state.user.login !== "") {
          state.isAuth = true;
        }
      } else {
        state.isAuth = false;
      }
    });
    builder.addCase(authMeAdmin.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
      state.user = {} as IUser;
      state.isAuth = false;
    });
  },
});

export const { actions, reducer } = adminSlice;
