import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/adminAxios";
import { IFaq } from "../../types/faq/faq";

export const getFaqs = createAsyncThunk("api/getFaqs", async () => {
  const response = await axios.get("/api/faqs");
  return response.data;
});

export const addFaq = createAsyncThunk("api/addFaq", async ({ faq }: { faq: IFaq }) => {
  return await axios
    .post("/api/add_faq", {
      params: {
        faq: faq,
      },
    })
    .then((response) => response.data);
});

export const updateFaq = createAsyncThunk("api/updateFaq", async ({ faq }: { faq: IFaq }) => {
  return await axios
    .post("/api/update_faq", {
      params: {
        faq: faq,
      },
    })
    .then((response) => response.data);
});

export const deleteFaq = createAsyncThunk("api/delete", async ({ id }: { id: number }) => {
  return await axios
    .post("/api/delete_faq", {
      params: {
        id: id,
      },
    })
    .then((response) => response.data);
});
