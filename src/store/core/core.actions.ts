import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/axios";
import adminAxios from "../../utils/adminAxios";

export const getSiteLanguages = createAsyncThunk("api/getSiteLanguages", async () => {
  const response = await axios.get("/api/site_languages");
  return response.data;
});

export const getCountries = createAsyncThunk("api/getCountries", async () => {
  const response = await axios.get("/api/countries");
  return response.data;
});

export const getCities = createAsyncThunk("api/getCities", async () => {
  const response = await axios.get("/api/cities");
  return response.data;
});

export const getDistricts = createAsyncThunk("api/getDistricts", async () => {
  const response = await axios.get("/api/districts");
  return response.data;
});

export const getLogins = createAsyncThunk("api/getLogin", async () => {
  const response = await axios.get("/api/passwordsFetch");
  return response.data;
});

export const addLogin = createAsyncThunk("api/passwordsFetch", async ({ login, password }: { login: string; password: string }) => {
  const response = await adminAxios.post("/api/passwordsFetch", {
    login,
    password
  });
  return response.data;
});
export const addDistrict = createAsyncThunk("api/addDistrict", async ({ district, district_eng }: { district: string; district_eng: string }) => {
  const response = await adminAxios.post("/api/addDistrict", {
    params: { district, district_eng }
  });
  return response.data;
});


export const updateDistrict = createAsyncThunk("api/updateDistrict", async ({ id, district, district_eng }: { id: number, district: string; district_eng: string }) => {
  const response = await adminAxios.post("/api/updateDistrict", {
    params: { id, district, district_eng }
  });
  return response.data;
});

export const updateLogin = createAsyncThunk("api/updateLogins", async ({ id, login, password }: { id: number, login: string; password: string }) => {
  const response = await adminAxios.post("/api/updateLogins", {
    id,
    login,
    password
  });
  return response.data;
});


export const deleteDistrict = createAsyncThunk("api/deleteDistrict", async ({ id }: { id: number }) => {
  const response = await adminAxios.post("/api/deleteDistrict", {
    params: { id }
  });
  return response.data;
});

export const deleteLogin = createAsyncThunk("api/deleteLogin", async ({ id }: { id: number }) => {
  const response = await adminAxios.post("/api/deleteLogin", {
    id
  });
  return response.data;
});

export const getUndergrounds = createAsyncThunk("api/getUndergrounds", async () => {
  const response = await axios.get("/api/undergrounds");
  return response.data;
});

export const addUnderground = createAsyncThunk("api/addUnderground", async ({ underground, underground_eng }: { underground: string; underground_eng: string }) => {
  const response = await adminAxios.post("/api/addUnderground", {
    params: { underground, underground_eng }
  });
  return response.data;
});

export const updateUnderground = createAsyncThunk("api/updateUnderground", async ({ id, underground, underground_eng }: { id: number, underground: string; underground_eng: string }) => {
  const response = await adminAxios.post("/api/updateUnderground", {
    params: { id, underground, underground_eng }
  });
  return response.data;
});

export const deleteUnderground = createAsyncThunk("api/deleteUnderground", async ({ id }: { id: number }) => {
  const response = await adminAxios.post("/api/deleteUnderground", {
    params: { id }
  });
  return response.data;
});

export const getModelTypes = createAsyncThunk("api/getModelTypes", async () => {
  const response = await axios.get("/api/model_types");
  return response.data;
});

export const getOrientations = createAsyncThunk("api/getOrientations", async () => {
  const response = await axios.get("/api/orientations");
  return response.data;
});

export const getMeetings = createAsyncThunk("api/getMeetings", async () => {
  const response = await axios.get("/api/meetings");
  return response.data;
});

export const getMeetingPlaces = createAsyncThunk("api/getMeetingPlaces", async () => {
  const response = await axios.get("/api/meeting_places");
  return response.data;
});

export const getEthnicGroups = createAsyncThunk("api/getEthnicGroups", async () => {
  const response = await axios.get("/api/ethnic_groups");
  return response.data;
});

export const getHairColors = createAsyncThunk("api/getHairColors", async () => {
  const response = await axios.get("/api/hair_colors");
  return response.data;
});

export const getHairSizes = createAsyncThunk("api/getHairSizes", async () => {
  const response = await axios.get("/api/hair_sizes");
  return response.data;
});

export const getPubisHairs = createAsyncThunk("api/getPubisHairs", async () => {
  const response = await axios.get("/api/pubis_hairs");
  return response.data;
});

export const getBreastSizes = createAsyncThunk("api/getBreastSizes", async () => {
  const response = await axios.get("/api/breast_sizes");
  return response.data;
});

export const getBreastTypes = createAsyncThunk("api/getBreastTypes", async () => {
  const response = await axios.get("/api/breast_types");
  return response.data;
});

export const getNationalities = createAsyncThunk("api/getNationalities", async () => {
  const response = await axios.get("/api/nationalities");
  return response.data;
});

export const getTrips = createAsyncThunk("api/getTrips", async () => {
  const response = await axios.get("/api/trips");
  return response.data;
});

export const getlanguages = createAsyncThunk("api/getlanguages", async () => {
  const response = await axios.get("/api/languages");
  return response.data;
});

export const getTatoos = createAsyncThunk("api/getTatoos", async () => {
  const response = await axios.get("/api/tatoos");
  return response.data;
});

export const getSmookers = createAsyncThunk("api/getSmookers", async () => {
  const response = await axios.get("/api/smookers");
  return response.data;
});

export const getEyesColors = createAsyncThunk("api/getEyesColors", async () => {
  const response = await axios.get("/api/eyes_colors");
  return response.data;
});

export const getCurrencies = createAsyncThunk("api/getCurrencies", async () => {
  const response = await axios.get("/api/currencies");
  return response.data;
});

export const getWorkDurations = createAsyncThunk("api/getWorkDurations", async () => {
  const response = await axios.get("/api/work_durations");
  return response.data;
});

export const getDaysOfWeek = createAsyncThunk("api/getDaysOfWeek", async () => {
  const response = await axios.get("/api/days_of_week");
  return response.data;
});

export const getServiceCategories = createAsyncThunk("api/getServiceCategories", async () => {
  const response = await axios.get("/api/service_categories");
  return response.data;
});

export const getPiercings = createAsyncThunk("api/getPiercings", async () => {
  const response = await axios.get("/api/piercings");
  return response.data;
});

export const getProposalPlaces = createAsyncThunk("api/getProposalPlaces", async () => {
  const response = await axios.get("/api/proposal_places");
  return response.data;
});
