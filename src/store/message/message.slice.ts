import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addMessage } from "./message.actions";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IServerStatus } from "../../types/main/serverStatus";

import { IMessage } from "../../types/message/message";

interface IMessageState {
  message: IMessage;
  emptyMessage: IMessage;
  serverStatus: IServerStatus;
}

const initialState: IMessageState = {
  message: {} as IMessage,
  emptyMessage: {
    id: 0,
    name: "",
    email: "",
    message: "",
  } as IMessage,
  serverStatus: {
    status: ServerStatusType.None,
    error: "",
  } as IServerStatus,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<IMessage>) {
      state.message = action.payload;
    },
    setMessageStatus(state, action: PayloadAction<IServerStatus>) {
      state.serverStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addMessage.pending, (state) => {
      state.serverStatus = { status: ServerStatusType.InProgress, error: "" };
    });
    builder.addCase(addMessage.fulfilled, (state, action) => {
      state.serverStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.message,
      };
    });
    builder.addCase(addMessage.rejected, (state) => {
      state.serverStatus = {
        status: ServerStatusType.Error,
        error: "server.mistake_try_again",
      };
    });
  },
});

export const { actions, reducer } = messageSlice;
