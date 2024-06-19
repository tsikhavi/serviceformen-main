import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IProfileStatuses, initProfileStatuses } from "./profile.statuses";

import {
  authMe,
  changePassword,
  confirmProfile,
  deleteProfile,
  generateToken,
  getAgencies,
  login,
  register,
  restorePassword,
  updateProfile,
} from "./profile.actions";

import { IProfile } from "../../../types/profile/profile/profile";
import { IServerStatus } from "../../../types/main/serverStatus";
import { ServerStatusType } from "../../../enums/serverStatusType";

interface IProfileState {
  profile: IProfile;
  agencies: IProfile[];
  isAuth: boolean;
  token: string;
  activeProfileSection: number;
  serverStatuses: IProfileStatuses;
}

const initialState: IProfileState = {
  profile: { id: -1 } as IProfile,
  agencies: [] as IProfile[],
  isAuth: false,
  token: "",
  activeProfileSection: 0,
  serverStatuses: initProfileStatuses(),
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    logout: (state) => {
      state.profile = {} as IProfile;
      state.isAuth = false;
      window.localStorage.removeItem("esco_token");
    },
    setActiveProfileSection(state, action: PayloadAction<number>) {
      state.activeProfileSection = action.payload;
    },
    setProfileStatuses(state, action: PayloadAction<IProfileStatuses>) {
      state.serverStatuses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
      if (action.payload.token) {
        state.profile = action.payload as IProfile;
        window.localStorage.setItem("esco_token", action.payload.token);
        state.isAuth = true;
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        login: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
      state.profile = {} as IProfile;
    });

    builder.addCase(register.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        register: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        register: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(register.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        register: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(generateToken.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        generateToken: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(generateToken.fulfilled, (state, action) => {
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      state.serverStatuses = {
        ...state.serverStatuses,
        generateToken: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(generateToken.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        generateToken: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(confirmProfile.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        confirmProfile: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(confirmProfile.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        confirmProfile: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(confirmProfile.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        confirmProfile: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(authMe.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
      state.isAuth = false;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
      if (action.payload.success) {
        state.profile = action.payload.user as IProfile;
        if (state.profile.login !== "") {
          if (action.payload.token) {
            window.localStorage.setItem("esco_token", action.payload.token);
          }
          state.isAuth = true;
        }
      } else {
        state.isAuth = false;
      }
    });
    builder.addCase(authMe.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        authMe: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
      state.profile = {} as IProfile;
      state.isAuth = false;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateProfile: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateProfile: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        updateProfile: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(changePassword.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        changePassword: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        changePassword: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        changePassword: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(deleteProfile.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteProfile: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(deleteProfile.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteProfile: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: action.payload.success ? "" : action.payload.message,
        } as IServerStatus,
      };
    });
    builder.addCase(deleteProfile.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        deleteProfile: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });

    builder.addCase(getAgencies.fulfilled, (state, action) => {
      state.agencies = [];
      state.agencies = action.payload as IProfile[];
    });
    builder.addCase(getAgencies.rejected, (state) => {
      state.agencies = [];
    });

    builder.addCase(restorePassword.pending, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        restorePassword: {
          status: ServerStatusType.InProgress,
          error: "",
        } as IServerStatus,
      };
    });
    builder.addCase(restorePassword.fulfilled, (state, action) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        restorePassword: {
          status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
          error: !action.payload.success ? action.payload.message : "",
        } as IServerStatus,
      };
    });
    builder.addCase(restorePassword.rejected, (state) => {
      state.serverStatuses = {
        ...state.serverStatuses,
        restorePassword: {
          status: ServerStatusType.Error,
          error: "server.mistake_try_again",
        } as IServerStatus,
      };
    });
  },
});

export const { actions, reducer } = profileSlice;
