import { createAsyncThunk } from "@reduxjs/toolkit";
import { render } from "@react-email/components";

import axios from "../../../utils/axios";

import { IProfile } from "../../../types/profile/profile/profile";

import RegisterEmail from "../../../emails/RegisterEmail";
import ForgotPasswordEmail from "../../../emails/ForgotPasswordEmail";

export const login = createAsyncThunk("api/login", async ({ login, password }: { login: string; password: string }) => {
  return await axios
    .post("/api/login", {
      params: {
        login: login,
        password: password,
      },
    })
    .then((response) => response.data);
});

export const register = createAsyncThunk(
  "api/register",
  async ({
    login,
    password,
    token,
    type,
    emailTitle,
    emailLogin,
    emailPassword,
    emailDescription,
    emailButtonText,
    emailComplete,
  }: {
    login: string;
    password: string;
    token: string;
    type: number;
    emailTitle: string;
    emailDescription: string;
    emailLogin: string;
    emailPassword: string;
    emailButtonText: string;
    emailComplete: string;
  }) => {
    const verificationUrl = `https://${process.env.REACT_APP_SITE_NAME}.xyz/api/verify/${token}/${login}`;

    return await axios
      .post("/api/register", {
        params: {
          login: login,
          password: password,
          type: type,
          html: render(
            RegisterEmail({
              login: login,
              password: password,
              token: token,
              emailTitle: emailTitle,
              emailLogin: emailLogin,
              emailPassword: emailPassword,
              emailDescription: emailDescription,
              emailButtonText: emailButtonText,
              emailComplete: emailComplete,
              verificationUrl: verificationUrl
            })
          ),
          email_login: process.env.VITE_EMAIL_USER!,
          email_password: process.env.VITE_EMAIL_PASS!,
          emailSubject: emailTitle,
        },
      })
      .then((response) => response.data);
  }
);


export const generateToken = createAsyncThunk("api/generateToken", async ({ login }: { login: string }) => {
  return await axios
    .post("/api/generate_token", {
      params: {
        login: login,
      },
    })
    .then((response) => response.data);
});

export const confirmProfile = createAsyncThunk(
  "api/confirmProfile",
  async ({ login, token }: { login: string; token: string }) => {
    return await axios
      .post("/api/confirm_profile", {
        params: {
          login: login,
          token: token,
        },
      })
      .then((response) => response.data);
  }
);

export const authMe = createAsyncThunk("api/authme", async () => {
  const response = await axios.get("/api/authme");
  return response.data;
});

export const verifyProfile = createAsyncThunk(
  "api/verifyProfile",
  async ({ token, login }: { token: string; login: string }) => {
    return await axios
      .get(`/api/verify/${token}/${login}`)
      .then((response) => response.data);
  }
);

export const updateProfile = createAsyncThunk("api/updateProfile", async ({ profile }: { profile: IProfile }) => {
  return await axios
    .post("/api/update_profile", {
      params: {
        id: profile.id,
        login: profile.login,
        password: profile.password,
      },
    })
    .then((response) => response.data);
});

export const changePassword = createAsyncThunk(
  "api/changePassword",
  async ({ login, token, password }: { login: string; token: string; password: string }) => {
    return await axios
      .post("/api/change_password", {
        params: {
          login: login,
          token: token,
          password: password,
        },
      })
      .then((response) => response.data);
  }
);

export const deleteProfile = createAsyncThunk("api/deleteProfile", async ({ agency_id }: { agency_id: number }) => {
  return await axios
    .post("/api/delete_profile", {
      params: {
        agency_id: agency_id,
      },
    })
    .then((response) => response.data);
});

export const getAgencies = createAsyncThunk("api/getAgencies", async () => {
  const response = await axios.get("/api/agencies");
  return response.data;
});

export const restorePassword = createAsyncThunk(
  "api/restorePassword",
  async ({
    login,
    token,
    emailTitle,
    emailDescription,
    emailLogin,
    emailButtonText,
  }: {
    login: string;
    token: string;
    emailTitle: string;
    emailDescription: string;
    emailLogin: string;
    emailButtonText: string;
  }) => {
    return await axios
      .post("/api/restore_password", {
        params: {
          login: login,
          html: render(
            ForgotPasswordEmail({
              login: login,
              token: token,
              title: emailTitle,
              description: emailDescription,
              loginText: emailLogin,
              buttonText: emailButtonText,
            })
          ),
          emailSubject: emailTitle,
          email_login: process.env.VITE_EMAIL_USER!,
          email_password: process.env.VITE_EMAIL_PASS!,
        },
      })
      .then((response) => response.data);
  }
);
