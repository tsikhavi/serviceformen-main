import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../../utils/axios";

import { IBlacklist } from "../../../types/profile/blacklist/blacklist";
import { IBlacklistAccess } from "../../../types/profile/blacklist/blacklistAccess";

export const getBlacklist = createAsyncThunk("api/getBlacklist", async () => {
  const response = await axios.get("/api/blacklist");
  return response.data;
});

export const addBlacklist = createAsyncThunk("api/addBlacklist", async ({ blacklist }: { blacklist: IBlacklist }) => {
  return await axios
    .post("/api/add_blacklist", {
      params: {
        agency_id: blacklist.agency_id,
        country_id: blacklist.country_id,
        city_id: blacklist.city_id,
        phone_number: blacklist.phone_number,
        description: blacklist.description,
      },
    })
    .then((response) => response.data);
});

export const deleteBlacklist = createAsyncThunk("api/deleteBlacklist", async ({ id }: { id: number }) => {
  return await axios
    .post("/api/delete_blacklist", {
      params: {
        id: id,
      },
    })
    .then((response) => response.data);
});

export const getBlacklistAccess = createAsyncThunk(
  "api/getBlacklistAccess",
  async ({ agency_id }: { agency_id: number }) => {
    return await axios
      .get("/api/blacklist_access", {
        params: {
          agency_id: agency_id,
        },
      })
      .then((response) => response.data);
  }
);

export const addBlacklistAccess = createAsyncThunk(
  "api/addBlacklistAccess",
  async ({ blacklistAccess }: { blacklistAccess: IBlacklistAccess }) => {
    return await axios
      .post("/api/add_blacklist_access", {
        params: {
          agency_id: blacklistAccess.agency_id,
          access_to: blacklistAccess.access_to,
        },
      })
      .then((response) => response.data);
  }
);

export const deleteBlacklistAccess = createAsyncThunk("api/deleteBlacklistAccess", async ({ id }: { id: number }) => {
  return await axios
    .post("/api/delete_blacklist_access", {
      params: {
        id: id,
      },
    })
    .then((response) => response.data);
});
