import { unlink } from "fs";

import { connectionPool } from "../../../connectionPool";

import Config from "../../../../../serverConfig";

import { IPhoto } from "../../../../types/model/photo/photo";

const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const updateMainPhoto = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "UPDATE photos SET is_main = 0 WHERE model_id = ?; UPDATE photos SET is_main = 1 WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.model_id, request.body.params.photo_id]);
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

const deletePhoto = (request, response) => {
  try {
    const modelId = request.body.params.photo.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "DELETE FROM photos WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.photo.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const directory = path.join(Config.directory, "uploads");
        if (fs.existsSync(path.join(directory, request.body.params.photo.photo_url))) {
          unlink(path.join(directory, request.body.params.photo.photo_url), (error) => {
            if (error) console.log(error);
          });
        }
        if (
          fs.existsSync(
            path.join(
              directory,
              (request.body.params.photo.photo_url as String).replace("/media/photos/", "/media/photos/thumbs/")
            )
          )
        ) {
          unlink(
            path.join(
              directory,
              (request.body.params.photo.photo_url as String).replace("/media/photos/", "/media/photos/thumbs/")
            ),
            (error) => {
              if (error) console.log(error);
            }
          );
        }
        
        const sqlPhotos = "SELECT * FROM photos WHERE model_id = ?;";
        const queryPhotos = mysql.format(sqlPhotos, [request.body.params.photo.model_id]);
        connectionPool.query(queryPhotos, (error, data) => {
          if (error) {
            return response.status(404).json({
              message: "server.mistake_try_again",
              error: error,
            });
          } else {
            
            const photos = data as IPhoto[];
            if (photos.length && ((photos.length === 2 && !photos[0].is_main) || request.body.params.photo.is_main)) {
              const sqlUpdate = "UPDATE photos SET is_main = 1 WHERE id = ?;";
              const queryUpdate = mysql.format(sqlUpdate, [photos[0].id]);
              connectionPool.query(queryUpdate, (error) => {
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
            } else {
              return response.status(200).json({ success: true });
            }
          }
        });
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

const getPhotos = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM photos", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const photos = data as IPhoto[];
        return response.json(photos);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updatePhotoStatus = async (request, response) => {
  try {
    const modelId = request.body.params.photo.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "UPDATE photos SET status = ?, update_date = ? WHERE id = ?;";
    const query = mysql.format(sql, [request.body.params.status, new Date(), request.body.params.photo.id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        if (request.body.params.photo.type === 0 && request.body.params.status === 2) {
          const sqlVerification = "UPDATE models SET is_verified = 1 WHERE id = ?";
          const queryVerification = mysql.format(sqlVerification, [request.body.params.photo.model_id]);
          connectionPool.query(queryVerification, (error) => {
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
        } else {
          return response.status(200).json({ success: true });
        }
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

export { updateMainPhoto, updatePhotoStatus, deletePhoto, getPhotos };
