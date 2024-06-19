import * as nodemailer from "nodemailer";

import { connectionPool } from "../../connectionPool";

const mysql = require("mysql");

const addMessage = async (request, response) => {
  try {
    const mailOptions = {
      from: "sexavenuex@gmail.com",
      to: "sexavenuex@gmail.com",
      subject: request.body.params.emailSubject,
      html: request.body.params.html,
    };
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.ru",
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: "sexavenuex@gmail.com",
        pass: "hfqarnmrocxwvxpp",
      },
    });
    transporter.sendMail(mailOptions, (error, _info) => {
      if (error) {
        console.log(error);
        response.status(500).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const sql = "INSERT INTO messages (??, ??, ??) VALUES (?, ?, ?);";
        const query = mysql.format(sql, [
          "name",
          "email",
          "message",
          request.body.params.name,
          request.body.params.email,
          request.body.params.message,
        ]);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "server.mistake_try_again",
              error: error,
            });
          } else {
            return response.status(200).json({
              success: true,
            });
          }
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { addMessage };
