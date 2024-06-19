import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

import { IProposal } from "../../types/proposal/proposal";
import { IProposalView } from "../../types/proposal/proposalView";

export const addProposal = createAsyncThunk("api/addProposal", async ({ proposal }: { proposal: IProposal }) => {
  return await axios
    .post("/api/add_proposal", {
      params: {
        proposal: proposal,
      },
    })
    .then((response) => response.data);
});

export const getProposals = createAsyncThunk("api/getProposals", async () => {
  const response = await axios.get("/api/proposals");
  return response.data;
});

export const getProposalViews = createAsyncThunk("api/getProposalViews", async () => {
  const response = await axios.get("/api/proposal_views");
  return response.data;
});

export const updateProposalViews = createAsyncThunk(
  "api/updateProposalViews",
  async ({ model_id, proposal_views }: { model_id: number; proposal_views: IProposalView[] }) => {
    return await axios
      .post("/api/update_proposal_views", {
        params: {
          model_id: model_id,
          proposal_views: proposal_views,
        },
      })
      .then((response) => response.data);
  }
);
