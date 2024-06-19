import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { addProposal, getProposalViews, getProposals, updateProposalViews } from "./proposal.actions";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IServerStatus } from "../../types/main/serverStatus";

import { IProposal } from "../../types/proposal/proposal";
import { IProposalView } from "../../types/proposal/proposalView";

interface IProposalState {
  proposals: IProposal[];
  proposalViews: IProposalView[];
  serverStatus: IServerStatus;
}

const initialState: IProposalState = {
  proposals: [] as IProposal[],
  proposalViews: [] as IProposalView[],
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
    builder.addCase(addProposal.pending, (state) => {
      state.serverStatus = { status: ServerStatusType.InProgress, error: "" };
    });
    builder.addCase(addProposal.fulfilled, (state, action) => {
      state.serverStatus = {
        status: action.payload.success ? ServerStatusType.Success : ServerStatusType.Error,
        error: action.payload.success ? "" : action.payload.proposal,
      };
    });
    builder.addCase(addProposal.rejected, (state) => {
      state.serverStatus = {
        status: ServerStatusType.Error,
        error: "server.mistake_try_again",
      };
    });

    builder.addCase(getProposals.pending, (_state) => {});
    builder.addCase(getProposals.fulfilled, (state, action) => {
      state.proposals = [];
      state.proposals = action.payload as IProposal[];
    });
    builder.addCase(getProposals.rejected, (state) => {
      state.proposals = [];
    });

    builder.addCase(getProposalViews.pending, (_state) => {});
    builder.addCase(getProposalViews.fulfilled, (state, action) => {
      state.proposalViews = [];
      state.proposalViews = action.payload as IProposalView[];
    });
    builder.addCase(getProposalViews.rejected, (state) => {
      state.proposalViews = [];
    });

    builder.addCase(updateProposalViews.pending, (_state) => {});
    builder.addCase(updateProposalViews.fulfilled, (_state, _action) => {});
    builder.addCase(updateProposalViews.rejected, (_state) => {});
  },
});

export const { actions, reducer } = proposalSlice;
