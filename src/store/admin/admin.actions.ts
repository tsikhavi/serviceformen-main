import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../utils/adminAxios";

export const loginAdmin = createAsyncThunk(
  "api/loginAdmin",
  async ({ login, password }: { login: string; password: string }) => {
    return await axios
      .post("/api/login_admin", {
        params: {
          login: login,
          password: password,
        },
      })
      .then((response) => response.data);
  }
);

export const authMeAdmin = createAsyncThunk("api/authme_admin", async () => {
  const response = await axios.get("/api/authme_admin");
  return response.data;
});
