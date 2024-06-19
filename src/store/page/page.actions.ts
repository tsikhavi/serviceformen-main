import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/adminAxios";
import { IPage } from "../../types/page/page";

export const getPages = createAsyncThunk("api/getPages", async () => {
  const response = await axios.get("/api/pages");
  return response.data;
});

export const updatePage = createAsyncThunk("api/updatePage", async ({ page }: { page: IPage }) => {
  return await axios
    .post("/api/update_page", {
      params: {
        page: page,
      },
    })
    .then((response) => response.data);
});
