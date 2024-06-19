import { createAsyncThunk } from "@reduxjs/toolkit";
import { render } from "@react-email/components";

import axios from "../../utils/axios";

import { IMessage } from "../../types/message/message";

import ContactUsEmail from "../../emails/ContactUsEmail";

export const addMessage = createAsyncThunk(
  "api/addMessage",
  async ({
    message,
    emailTitle,
    emailName,
    emailMessage,
  }: {
    message: IMessage;
    emailTitle: string;
    emailName: string;
    emailMessage: string;
  }) => {
    return await axios
      .post("/api/add_message", {
        params: {
          name: message.name,
          email: message.email,
          message: message.message,
          html: render(
            ContactUsEmail({
              name: message.name,
              email: message.email,
              text: message.message,
              emailTitle: emailTitle,
              emailName: emailName,
              emailMessage: emailMessage,
            })
          ),
          emailSubject: emailTitle,
          login: process.env.VITE_EMAIL_USER!,
          password: process.env.VITE_EMAIL_PASS!,
        },
      })
      .then((response) => response.data);
  }
);
