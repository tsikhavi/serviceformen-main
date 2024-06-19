import { connectionPool } from "../../connectionPool";

import { IFaq } from "../../../types/faq/faq";

const mysql = require("mysql");

const getFaqs = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM faqs", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const faqs = data as IFaq[];
        return response.json(faqs);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const addFaq = async (request, response) => {
  try {
    const sql = "INSERT INTO faqs (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "question",
      "question_eng",
      "answer",
      "answer_eng",
      request.body.params.faq.question,
      request.body.params.faq.question_eng,
      request.body.params.faq.answer,
      request.body.params.faq.answer_eng,
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
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updateFaq = async (request, response) => {
  try {
    const sql = "UPDATE faqs SET ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "question",
      request.body.params.faq.question,
      "question_eng",
      request.body.params.faq.question_eng,
      "answer",
      request.body.params.faq.answer,
      "answer_eng",
      request.body.params.faq.answer_eng,
      "id",
      request.body.params.faq.id,
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
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const deleteFaq = async (request, response) => {
  try {
    const sql = "DELETE FROM faqs WHERE ?? = ?;";
    const query = mysql.format(sql, ["id", request.body.params.id]);
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
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { getFaqs, addFaq, updateFaq, deleteFaq };
