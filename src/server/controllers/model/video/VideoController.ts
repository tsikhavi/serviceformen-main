import { unlink } from "fs";

import { connectionPool } from "../../../connectionPool";

import Config from "../../../../../serverConfig";

import { IVideo } from "../../../../types/model/video/video";

const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const deleteVideo = (request, response) => {
  try {
    const modelId = request.body.params.video.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "DELETE FROM videos WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.video.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const directory = path.join(Config.directory, "uploads");
        if (fs.existsSync(path.join(directory, request.body.params.video.video_url))) {
          unlink(path.join(directory, request.body.params.video.video_url), (error) => {
            if (error) console.log(error);
          });
        }
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

const getVideos = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM videos", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const videos = data as IVideo[];
        return response.json(videos);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updateVideoStatus = (request, response) => {
  try {
    const modelId = request.body.params.video.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "UPDATE videos SET status = ? WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.status, request.body.params.video.id]);
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

export { getVideos, updateVideoStatus, deleteVideo };
