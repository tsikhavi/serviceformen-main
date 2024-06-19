import 'dotenv/config'
import { connectionPool } from "../../connectionPool";
import { Roles } from "../../auth/rbac";

import { IUser } from "../../../types/user/user";

const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const loginAdmin = (request, response) => {
  try {
    const sql = "SELECT * FROM users WHERE login = ? AND password = ?";
    const query = mysql.format(sql, [request.body.params.login, request.body.params.password]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "global.invalid_username",
          error: error,
        });
      } else {
        const auth = data as IUser[];
        if (auth.length === 0) {
          return response.status(200).json({
            success: false,
            message: "global.invalid_username",
          });
        } else {
          const token = jwt.sign(
            {
              _id: auth[0].id,
              roles: Roles.Admin
            },
            process.env.JWT_TOKEN_SECRET,
            {
              expiresIn: "3d",
            }
          );
          response.json({
            ...auth[0],
            token,
            success: true,
          });
        }
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

const authmeAdmin = (request, response) => {
  try {
    connectionPool.query('SELECT * FROM users WHERE id="' + request.id + '"', async (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Пользователь не найден",
          error: error,
        });
      } else {
        if ((data as IUser[]).length > 0) {
          return response.status(200).json({
            success: true,
            user: (data as IUser[])[0],
            date: new Date(),
          });
        } else {
          return response.status(200).json({
            success: false,
            message: "Пользователь не найден",
          });
        }
      }
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Не удалось проверить пользователя",
      error: error,
    });
  }
};

export { loginAdmin, authmeAdmin };
