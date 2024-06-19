import { connectionPool } from "../../../connectionPool";

const mysql = require("mysql");

const addWorkTimes = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    let sql = "DELETE FROM work_times WHERE ?? = ?; ";
    const values = ["model_id", request.body.params.model_id] as string[];
    request.body.params.work_times.forEach((workTime) => {
      sql += "INSERT INTO work_times (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?); ";
      values.push(
        "model_id",
        "time_start",
        "time_end",
        "is_all_day",
        "day_of_week_id",
        request.body.params.model_id,
        workTime.time_start,
        workTime.time_end,
        workTime.is_all_day,
        workTime.day_of_week_id
      );
    });
    const query = mysql.format(sql, values);
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
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { addWorkTimes };
