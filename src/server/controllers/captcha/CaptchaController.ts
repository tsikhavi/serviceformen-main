import { connectionPool } from "../../connectionPool";
import { createCanvas } from "canvas";
import 'dotenv/config';

import mysql, { RowDataPacket } from "mysql";
import * as crypto from "crypto";

const timeShowFrom = process.env.UPDATE_POSITION_CAPTCA_SHOW_FROM;
const timeShowTo = process.env.UPDATE_POSITION_CAPTCA_SHOW_TO;

const minNumOfKeys = Number(process.env.UPDATE_POSITION_MIN_NUMBER_OF_KEYS);
const maxNumOfKeys = Number(process.env.UPDATE_POSITION_MAX_NUMBER_OF_KEYS);

function getR(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to encrypt a string using a token
async function encryptString(plainText: string, token: string) {
  const key = crypto.pbkdf2Sync(token, '', 100000, 32, 'sha256');
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encryptedData = cipher.update(plainText, 'utf8', 'hex');
  encryptedData += cipher.final('hex');

  const tag = cipher.getAuthTag();
  
  return iv.toString('hex') + encryptedData + tag.toString('hex');
}

const getCaptcha = async (request: any, response: any) => {
  try {
    const modelId = request.body.params.model_id;
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const token = request.headers.authorization.split('.')[2];
    const numberOfKeys = getR(minNumOfKeys, maxNumOfKeys);
    
    const keysArray: Array<any> = [];

    let verificationKey = '';
    for (let index = 0; index < numberOfKeys; index++) {      
      const captchaRandNumber = getR(1, 9);

      const canvas = createCanvas(30, 30);
      const ctx = canvas.getContext('2d');

      const numberString = captchaRandNumber.toString();
      ctx.font = 30 + "px Arial"; // Set the font size and family
      ctx.fillText(numberString, getR(0, 12), -1 * getR(0, 6) + 30); // Draw the text

      // Get the pixel data
      const imageData = ctx.getImageData(0, 0, 30, 30);
      const pixels = imageData.data;

      // Convert the pixel data into a 2D array
      const pixelArray: number[] = [];
      for (let i = 0; i < pixels.length; i += 4) {
        pixelArray.push(pixels[i + 3]);
      }
      
      let flipedPixelArray: number[] = [];
      for (let i = 0; i < 30; i += 1) {
        flipedPixelArray = [ ...pixelArray.slice(i * 30, (i + 1) * 30), ...flipedPixelArray];
      }

      // Fragment shader program
      const fsSource = `#version 300 es
          precision mediump float;
          
          uniform float u_time;
          uniform vec2 u_resolution;
          const int u_array[900] = int[900](${flipedPixelArray});
          out vec4 FragColor;

          #define width 30
          #define height 30

          void main() {
              if (u_time < ${timeShowFrom} || u_time > ${timeShowTo}) {
                  discard; // Discard pixel if number is not being drawn yet
              }

              vec2 arrayCoord = gl_FragCoord.xy / u_resolution * vec2(width, height);
              int index = int(arrayCoord.x) + int(arrayCoord.y) * width;

              if (u_array[index] > 0) {
                  FragColor = vec4(1.0, 0.0, 0.0, 1.0);
              } else {
                  FragColor = vec4(0.0, 0.0, 0.0, 1.0);
              }
          }
      `;
      keysArray.push({
        key: captchaRandNumber,
        value: fsSource
      });
      verificationKey += '' + captchaRandNumber;
    }

    const lastKey = await encryptString(JSON.stringify(keysArray), token);

    const sqlGet = "SELECT * FROM verification WHERE agency_id = ? and model_id = ?";
    const queryGet = mysql.format(sqlGet, [request.body.params.agency_id, modelId]);
    connectionPool.query(queryGet, (error, data: RowDataPacket[]) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "server.mistake_try_again",
        });
      } else {
        if (data && data.length > 0) {
          const attempts = data[0].attempts_number;
          const lastTryDate = (new Date(data[0].last_try).toISOString()).substring(0, 13);
          const newTryDate = (new Date().toISOString()).substring(0, 13);

          if (attempts < 1 && lastTryDate == newTryDate) {
            return response.status(200).json({
              success: false,
              message: "server.to_many_attempts",
            });
          } else {
            const sql = "UPDATE verification SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ? and ?? = ?;";
            const query = mysql.format(sql, [
              "attempts_number",
              (lastTryDate == newTryDate) ? (attempts - 1) : 5,
              "verification_key",
              verificationKey,
              "last_try",
              new Date().toISOString(),
              "agency_id",
              request.body.params.agency_id,
              "model_id",
              request.body.params.model_id,
            ]);
            connectionPool.query(query, (error) => {
              if (error) {
                return response.status(200).json({
                  success: false,
                  message: "server.mistake_try_again",
                  error: error,
                });
              } else {
                return response.status(200).json({ success: true, key: lastKey });
              }
            });
          }
        } else {
          const sql = "INSERT INTO verification (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
          const query = mysql.format(sql, [
            "agency_id",
            "model_id",
            "verification_key",
            "last_try",
            request.body.params.agency_id,
            request.body.params.model_id,
            verificationKey,
            new Date().toISOString(),
          ]);
          connectionPool.query(query, (error) => {
            if (error) {
              return response.status(200).json({
                success: false,
                message: "server.mistake_try_again",
                error: error,
              });
            } else {
              return response.status(200).json({ success: true, key: lastKey });
            }
          });
        }
      }
    });
  } catch (error) {
    response.status(200).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const verifyCaptcha = (request: any, response: any) => {
  try {
    const modelId = request.body.params.model_id;
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(200).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sqlGet = "SELECT * FROM verification WHERE agency_id = ? and model_id = ?";
    const queryGet = mysql.format(sqlGet, [request.body.params.agency_id, modelId]);
    connectionPool.query(queryGet, (error, data: RowDataPacket[]) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "server.mistake_try_again",
        });
      } else {        
        const keyOriginal = data[0].verification_key;
        const keyUser = request.body.params.key;
        if (keyOriginal == keyUser) {
          const sql = "UPDATE models SET ?? = ? WHERE id = ?";
          const query = mysql.format(sql,
            [
              'last_position_update',
              new Date(),
              request.body.params.model_id
            ]
          );
          connectionPool.query(query, (error) => {
            if (error) {
              return response.status(200).json({
                success: false,
                message: "Ошибка при получении модели",
              });
            } else {
              return response.status(200).json({ success: true });
            }
          });
        } else {
          return response.status(200).json({
            success: false,
            message: "wrong_key",
          });
        }
      }
    });

  } catch (error) {
    response.status(200).json({
      success: false,
      message: "server.mistake_try_again",
    });
  }
};

const getVerificationsforAgency = (request: any, response: any) => {
  try {
    const sqlGet = "SELECT id, model_id, attempts_number, last_try FROM verification WHERE agency_id = ?";
    const queryGet = mysql.format(sqlGet, [request.body.params.agency_id]);
    connectionPool.query(queryGet, (error, data: RowDataPacket[]) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "server.mistake_try_again",
        });
      } else {
        return response.status(200).json({ success: true, data });
      }
    });

  } catch (error) {
    response.status(200).json({
      success: false,
      message: "server.mistake_try_again",
    });
  }
};

export { getCaptcha, verifyCaptcha, getVerificationsforAgency };
