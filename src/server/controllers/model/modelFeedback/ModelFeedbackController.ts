import { connectionPool } from "../../../connectionPool";

import { IModelFeedback } from "../../../../types/model/modelFeedback/modelFeedback";

const mysql = require("mysql");

const addModelFeedback = (request, response) => {
  try {
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress;
    const secChUa = request.headers['sec-ch-ua'];
    const platform = request.headers['sec-ch-ua-platform'];
    const mobile = request.headers['sec-ch-ua-mobile'];
    const acceptLanguage = request.headers['accept-language'];
    const userData = { ip, secChUa, platform, mobile, acceptLanguage }
    
    const sql =
      "INSERT INTO model_feedbacks (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "model_id",
      "name",
      "is_from_model",
      "is_photo_real",
      "is_only_one",
      "text",
      "rate",
      "create_date",
      "status",
      "parent_id",
      "user_data",
      request.body.params.model_feedback.model_id,
      request.body.params.model_feedback.name,
      request.body.params.model_feedback.is_from_model,
      request.body.params.model_feedback.is_photo_real,
      request.body.params.model_feedback.is_only_one,
      request.body.params.model_feedback.text,
      request.body.params.model_feedback.rate,
      new Date(),
      "1",
      request.body.params.model_feedback.parent_id,
      JSON.stringify(userData),
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const getModelFeedbacks = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM model_feedbacks", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const modelFeedbacks = data as IModelFeedback[];
        return response.json(modelFeedbacks);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updateModelFeedbackStatus = (request, response) => {
  try {
    const sql = "UPDATE model_feedbacks SET status = ? WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.status, request.body.params.model_feedback.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updateModelFeedbacksView = (request, response) => {
  try {
    const sql = "UPDATE model_feedbacks SET is_viewed = 1 WHERE model_id = ?;";
    const query = mysql.format(sql, [request.body.params.model_id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const deleteModelFeedback = (request, response) => {
  try {
    const sql = "DELETE FROM model_feedbacks WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.feedback.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        return response.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { addModelFeedback, updateModelFeedbackStatus, getModelFeedbacks, updateModelFeedbacksView, deleteModelFeedback };
