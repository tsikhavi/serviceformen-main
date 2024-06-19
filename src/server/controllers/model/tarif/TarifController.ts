import { connectionPool } from "../../../connectionPool";

const mysql = require("mysql");

const addTarifs = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    let sql = "DELETE FROM tarifs WHERE ?? = ?; ";
    const values = ["model_id", request.body.params.model_id] as string[];
    request.body.params.tarifs.forEach((tarif) => {
      sql += "INSERT INTO tarifs (??, ??, ??, ??) VALUES (?, ?, ?, ?); ";
      values.push(
        "model_id",
        "work_duration_id",
        "meeting_place_id",
        "price",
        request.body.params.model_id,
        tarif.work_duration_id,
        tarif.meeting_place_id,
        tarif.price
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

export { addTarifs };
