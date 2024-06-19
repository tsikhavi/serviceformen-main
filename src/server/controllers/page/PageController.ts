import { connectionPool } from "../../connectionPool";

import { IPage } from "../../../types/page/page";

const mysql = require("mysql");

const getPages = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM pages", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const pages = data as IPage[];
        return response.json(pages);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updatePage = async (request, response) => {
  try {
    const sql = "UPDATE pages SET ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "content",
      request.body.params.page.content,
      "content_eng",
      request.body.params.page.content_eng,
      "id",
      request.body.params.page.id,
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

export { getPages, updatePage };
