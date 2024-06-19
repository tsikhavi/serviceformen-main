import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";

export const getCaptcha = createAsyncThunk("api/create_captcha", async ({ data }: { data }) => {
  return await axios
    .post("/api/create_captcha", {
      params: {
        agency_id: data.agency_id,
        model_id: data.model_id,
      },
    })
    .then((response) => response.data);
});

export const verifyCaptcha = createAsyncThunk("api/verify_captcha", async ({ data }: { data }) => {
  return await axios
    .post("/api/verify_captcha", {
      params: {
        agency_id: data.agency_id,
        model_id: data.model_id,
        verification_key: data.verification_key
      },
    })
    .then((response) => response.data);
});

export const getPositionsUp = createAsyncThunk("api/get_positions_up", async ({ agency_id }: { agency_id }) => {
  return await axios
    .post("/api/get_positions_up", {
      params: {
        agency_id,
      },
    })
    .then((response) => response.data);
});