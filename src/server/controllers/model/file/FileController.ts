import { unlink } from "fs";

import { connectionPool } from "../../../connectionPool";

import Config from "../../../../../serverConfig";
import { IPhoto } from "../../../../types/model/photo/photo";

const fs = require("fs");
const path = require("path");
const mysql = require("mysql");

const uploadCheckPhoto = (request, response) => {
  try {
    const modelId = request.body.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    if (request.files) {
      const file = request.files.checkPhoto;
      const directory = path.join(Config.directory, "uploads", "media", "check_photos");
      const fileNameArr = file.name.split(".");
      const fileName = request.body.model_id + "mck" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(path.join(directory), { recursive: true });
      }
      file.mv(path.join(directory, fileName), function (error) {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
          });
        } else {
          const sql = "INSERT INTO photos (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
          const query = mysql.format(sql, [
            "model_id",
            "photo_url",
            "type",
            "status",
            "update_date",
            request.body.model_id,
            "/media/check_photos/" + fileName,
            0,
            1,
            new Date(),
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
        }
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const uploadTmpPublicPhoto = (request, response) => {
  try {
    if (request.files) {
      const file = request.files.publicPhoto;
      const directory = path.join(Config.directory, "uploads", "media", "photos", "tmp");
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(path.join(directory), { recursive: true });
      }
      file.mv(path.join(directory, request.body.filename), function (error) {
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
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const uploadPublicPhoto = (request, response) => {
  try {
    const modelId = request.body.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    if (request.files) {
      const file = request.files.publicPhoto;
      const directory = path.join(Config.directory, "uploads", "media", "photos");
      if (!fs.existsSync(path.join(directory))) {
        fs.mkdirSync(path.join(directory), { recursive: true });
      }
      if (fs.existsSync(path.join(directory, "tmp", request.body.filename))) {
        unlink(path.join(directory, "tmp", request.body.filename), (error) => {
          if (error) console.log(error);
        });
      }
      file.mv(path.join(directory, request.body.filename), function (error) {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
          });
        } else {
          const fileThumb = request.files.thumbnail;
          const directoryThumb = path.join(Config.directory, "uploads", "media", "photos", "thumbs");
          if (!fs.existsSync(directoryThumb)) {
            fs.mkdirSync(path.join(directoryThumb), { recursive: true });
          }
          if (fs.existsSync(path.join(directoryThumb, request.body.filename))) {
            unlink(path.join(directoryThumb, request.body.filename), (error) => {
              if (error) console.log(error);
            });
          }
          fileThumb.mv(path.join(directoryThumb, request.body.filename), async function (error) {
            if (error) {
              return response.status(404).json({
                success: false,
                message: "server.mistake_try_again",
                error: error,
              });
            } else {
              const photos = await new Promise((resolve) => {
                const sqlPhotos = "SELECT * FROM photos WHERE model_id = ?;";
                const queryPhotos = mysql.format(sqlPhotos, [request.body.model_id]);
                connectionPool.query(queryPhotos, (error, data) => {
                  if (error) {
                    resolve([]);
                  } else {
                    const photos = data as IPhoto[];
                    resolve(photos);
                  }
                });
              }) as IPhoto[] | undefined;
              
              const sql = "INSERT INTO photos (??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?);";
              const query = mysql.format(sql, [
                "model_id",
                "photo_url",
                "type",
                "update_date",
                "is_main",
                request.body.model_id,
                "/media/photos/" + request.body.filename,
                1,
                new Date(),
                !(photos && photos.length && photos.length > 0),
              ]);
              
              await new Promise((resolve) => {
                const sqlPhotos = "SELECT * FROM photos WHERE model_id = ? AND type = 0;";
                const queryPhotos = mysql.format(sqlPhotos, [request.body.model_id]);
                connectionPool.query(queryPhotos, (error, data) => {
                  if (error) {
                    resolve(false);
                  } else {
                    const photos = data as IPhoto[];
                    if (photos && photos.length && photos.length > 0) {
                      const sql = "UPDATE photos SET status = 1 WHERE id = ?;";
                      const query = mysql.format(sql, [photos[photos.length - 1].id]);
                      connectionPool.query(query, (error) => {
                        if (error) {
                          resolve(false);
                        } else {
                          resolve(true);
                        }
                      });
                    }
                    resolve(true);
                  }
                });
              });

              connectionPool.query(query, (error) => {
                if (error) {
                  return response.status(404).json({
                    success: false,
                    message: "server.mistake_try_again",
                    error: error,
                  });
                } else {
                  const sqlModel = "UPDATE models SET is_verified = 0 WHERE id = ?;";
                  const queryModel = mysql.format(sqlModel, [request.body.model_id]);
                  connectionPool.query(queryModel, (error) => {
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
                }
              });
            }
          });
        }
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const uploadPublicVideo = (request, response) => {
  try {
    const modelId = request.body.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    if (request.files) {
      const file = request.files.publicVideo;
      const directory = path.join(Config.directory, "uploads", "media", "videos");
      console.log(directory);
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(path.join(directory), { recursive: true });
      }
      file.mv(path.join(directory, request.body.filename), function (error) {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "server.mistake_try_again",
            error: error,
          });
        } else {
          const sql = "INSERT INTO videos (??, ??) VALUES (?, ?);";
          const query = mysql.format(sql, [
            "model_id",
            "video_url",
            request.body.model_id,
            "/media/videos/" + request.body.filename,
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
        }
      });
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

export { uploadCheckPhoto, uploadPublicPhoto, uploadPublicVideo, uploadTmpPublicPhoto };
