import { connectionPool } from "../../../connectionPool";

const mysql = require("mysql");

const addModelServices = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    let sql = "DELETE FROM model_services WHERE ?? = ?; ";
    const values = ["model_id", request.body.params.model_id] as string[];
    request.body.params.model_services.forEach((modelService) => {
      sql += "INSERT INTO model_services (??, ??, ??) VALUES (?, ?, ?); ";
      values.push(
        "model_id",
        "service_id",
        "price",
        request.body.params.model_id,
        modelService.service_id,
        modelService.price
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

export { addModelServices };
