import { connectionPool } from "../../connectionPool";
import { IProposal } from "../../../types/proposal/proposal";
import { IProposalView } from "../../../types/proposal/proposalView";

const mysql = require("mysql");

const addProposal = (request, response) => {
  try {
    const sql = "INSERT INTO proposals (??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "name",
      "profile_id",
      "place",
      "min_price",
      "max_price",
      "description",
      "contact",
      "status",
      request.body.params.proposal.name,
      request.body.params.proposal.profile_id,
      request.body.params.proposal.place,
      request.body.params.proposal.min_price,
      request.body.params.proposal.max_price,
      request.body.params.proposal.description,
      request.body.params.proposal.contact,
      request.body.params.proposal.status,
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
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const getProposals = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM proposals", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Заказы не найдены",
          error: error,
        });
      } else {
        const proposals = data as IProposal[];
        return response.json(proposals);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить заказы",
      error: error,
    });
  }
};

const getProposalViews = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM proposal_views", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Просмотры заказов не найдены",
          error: error,
        });
      } else {
        const proposalViews = data as IProposalView[];
        return response.json(proposalViews);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить просмотры заказов",
      error: error,
    });
  }
};

const updateProposalViews = (request, response) => {
  try {
    let sql = "DELETE FROM proposal_views WHERE ?? = ?;";
    const values = ["model_id", request.body.params.model_id] as string[];
    request.body.params.proposal_views.forEach((proposal_view) => {
      sql += "INSERT INTO proposal_views (??, ??) VALUES (?, ?);";
      values.push("model_id", "proposal_id", proposal_view.model_id, proposal_view.proposal_id);
    });
    const query = mysql.format(sql, values);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Не удалось обновить показы заказов",
          error: error,
        });
      } else {
        const proposalViews = data as IProposalView[];
        return response.json(proposalViews);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось обновить показы заказов",
      error: error,
    });
  }
};

export { addProposal, getProposals, getProposalViews, updateProposalViews };
