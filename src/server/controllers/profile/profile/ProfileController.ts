import * as nodemailer from "nodemailer";
import * as bcrypt from "bcryptjs";
import 'dotenv/config'

import { connectionPool } from "../../../connectionPool";
import { Roles } from "../../../auth/rbac";

import { IProfile } from "../../../../types/profile/profile/profile";
import { IDeletedProfile } from "../../../../types/profile/profile/deletedProfile";
import { IModel } from "../../../../types/model/model/model";

const saltRounds = 5;
const mysql = require("mysql");
const jwt = require("jsonwebtoken");

const login = (request, response) => {
  try {
    const sql = "SELECT * FROM profiles WHERE is_confirmed = 1 AND login = ?";
    const query = mysql.format(sql, [request.body.params.login]);
    connectionPool.query(query, async (error, data) => {
      if (error) {
        return response.status(200).json({
          success: false,
          message: "global.invalid_username",
          error: error,
        });
      } else {
        const auth = data as IProfile[];
        if (auth.length === 0) {
          return response.status(200).json({
            success: false,
            message: "global.invalid_username",
          });
        } else {
          const match = await bcrypt.compare(request.body.params.password, auth[0].password);
          if (match) {
            const sqlCheck = "SELECT * FROM deleted_profiles WHERE agency_id = ?";
            const queryCheck = mysql.format(sqlCheck, auth[0].id);
            connectionPool.query(queryCheck, async (error, checkData) => {
              if (error) {
                return response.status(200).json({
                  success: false,
                  message: "server.mistake_try_again",
                  error: error,
                });
              } else {
                const deleterProfiles = checkData as IProfile[];
                if (Array.isArray(deleterProfiles) && deleterProfiles.length > 0) {
                  return response.status(200).json({
                    success: false,
                    message: "global.user_has_been_deleted",
                    error: error,
                  });
                } else {
                  const models = await new Promise((resolve) => {
                    const sqlModels = "SELECT id FROM models WHERE agency_id = ?";
                    const queryModels = mysql.format(sqlModels, auth[0].id);
                    connectionPool.query(queryModels, (error, data) => {
                      if (error) {
                        resolve([]);
                      } else {
                        const photos = data as IModel[];
                        resolve(photos);
                      }
                    });
                  }) as IModel[];

                  const token = jwt.sign(
                    {
                      _id: auth[0].id,
                      models: models.map(m => m.id),
                      roles: auth[0].type === 0 ? Roles.Agency : Roles.Customer
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
          } else {
            return response.status(200).json({
              success: false,
              message: "global.invalid_username",
            });
          }
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

const register = (request, response) => {
  try {
    const sqlCheck = "SELECT * FROM profiles WHERE login = ?;";
    const queryCheck = mysql.format(sqlCheck, [request.body.params.login]);
    connectionPool.query(queryCheck, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const profiles = data as IProfile[];
        if (Array.isArray(profiles) && profiles.length > 0) {
          const sqlDeleteCheck = "SELECT * FROM deleted_profiles WHERE agency_id = ?";
          const queryDeleteCheck = mysql.format(sqlDeleteCheck, [profiles[0].id]);
          connectionPool.query(queryDeleteCheck, (error, data) => {
            if (error) {
              return response.status(404).json({
                success: false,
                message: "server.mistake_try_again",
                error: error,
              });
            } else {
              const deletedProfiles = data as IDeletedProfile[];
              if (!Array.isArray(deletedProfiles) || deletedProfiles.length === 0) {
                return response.status(200).json({
                  success: false,
                  message: "global.user_already_registered",
                  error: "Пользователь с таким именем уже зарегистрирован",
                });
              } else {
                const mailOptions = {
                  from: "sexavenuex@gmail.com",
                  to: request.body.params.login,
                  subject: request.body.params.emailSubject,
                  html: request.body.params.html,
                };
                const transporter = nodemailer.createTransport({
                  host: "smtp.gmail.ru",
                  port: 587,
                  secure: false,
                  service: "gmail",
                  auth: {
                    user: "sexavenuex@gmail.com",
                    pass: "hfqarnmrocxwvxpp",
                  },
                });
                transporter.sendMail(mailOptions, (error, _info) => {
                  if (error) {
                    console.log(error);
                    return response.status(500).json({
                      success: false,
                      message: "server.mistake_try_again",
                      error: error,
                    });
                  } else {
                    const sql =
                      "UPDATE profiles SET ?? = ?, is_confirmed = 0 WHERE id = ?; DELETE FROM deleted_profiles WHERE id = ?";
                    const query = mysql.format(sql, [
                      "password",
                      request.body.params.password,
                      profiles[0].id,
                      deletedProfiles[0].id,
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
            }
          });
        } else {
          const mailOptions = {
            from: "sexavenuex@gmail.com",
            to: request.body.params.login,
            subject: request.body.params.emailSubject,
            html: request.body.params.html,
          };
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.ru",
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
              user: "sexavenuex@gmail.com",
              pass: "hfqarnmrocxwvxpp",
            },
          });
          transporter.sendMail(mailOptions, async (error, _info) => {
            if (error) {
              console.log(error);
              return response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
                error: error,
              });
            } else {
              const sql = "INSERT INTO profiles (??, ??, ??, ??) VALUES (?, ?, ?, ?);";
              const hash = await bcrypt.hash(request.body.params.password, saltRounds);
              const query = mysql.format(sql, [
                "login",
                "password",
                "balance",
                "type",
                request.body.params.login,
                hash,
                0,
                request.body.params.type,
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

const generateToken = (request, response) => {
  try {
    const token = jwt.sign(
      {
        _id: request.body.params.login,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    if (token) {
      response.status(200).json({ success: true, token: token });
    } else {
      response.status(404).json({
        success: false,
        message: "Ошибка при генерации токена",
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({
      success: false,
      message: "Не удалось сгенерировать токен",
      error: error,
    });
  }
};

const confirmProfile = (request, response) => {
  try {
    const decoded = jwt.verify(request.body.params.token, process.env.JWT_TOKEN_SECRET);
    request.id = decoded._id;
    if (decoded._id === request.body.params.login) {
      const sql = "UPDATE profiles SET is_confirmed = 1 WHERE login = ?;";
      const query = mysql.format(sql, [request.body.params.login]);
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
    } else {
      return response.status(404).json({
        success: false,
        message: "server.mistake_try_again",
        error: "",
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

const authme = (request, response) => {
  try {
    connectionPool.query('SELECT * FROM profiles WHERE id="' + request.id + '"', async (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Пользователь не найден",
          error: error,
        });
      } else {
        if ((data as IProfile[]).length > 0) {
          const models = await new Promise((resolve) => {
            const sqlModels = "SELECT id FROM models WHERE agency_id = ?";
            const queryModels = mysql.format(sqlModels, data[0].id);
            connectionPool.query(queryModels, (error, data) => {
              if (error) {
                resolve([]);
              } else {
                const photos = data as IModel[];
                resolve(photos);
              }
            });
          }) as IModel[];

          const token = jwt.sign(
            {
              _id: data[0].id,
              models: models.map(m => m.id),
              roles: data[0].type === 0 ? Roles.Agency : Roles.Customer
            },
            process.env.JWT_TOKEN_SECRET,
            {
              expiresIn: "3d",
            }
          );
          return response.status(200).json({
            success: true,
            user: (data as IProfile[])[0],
            date: new Date(),
            token,
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

const updateProfile = async (request, response) => {
  try {
    const sql = "UPDATE profiles SET login = ?, password = ? WHERE id = ?;";
    const hash = await bcrypt.hash(request.body.params.password, saltRounds);
    const query = mysql.format(sql, [request.body.params.login, hash, request.id, 0]);
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

const changePassword = async (request, response) => {
  try {
    const decoded = jwt.verify(request.body.params.token, process.env.JWT_TOKEN_SECRET);
    request.id = decoded._id;
    if (decoded._id === request.body.params.login) {
      const sql = "UPDATE profiles SET password = ? WHERE login = ?;";
      const hash = await bcrypt.hash(request.body.params.password, saltRounds);
      const query = mysql.format(sql, [hash, request.body.params.login]);
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
    } else {
      return response.status(404).json({
        success: false,
        message: "server.error",
        error: "",
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

const deleteProfile = (request, response) => {
  try {
    const sql = "INSERT INTO deleted_profiles (??, ??) VALUES (?, ?);";
    const query = mysql.format(sql, ["agency_id", "delete_date", request.id, new Date()]);
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

const getAgencies = (_request, response) => {
  try {
    connectionPool.query("SELECT id FROM profiles", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ошибка при получении агентств",
          error: error,
        });
      } else {
        const agencies = data as IProfile[];
        return response.json(agencies);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить агентства",
      error: error,
    });
  }
};

const restorePassword = (request, response) => {
  try {
    const sqlCheck = "SELECT EXISTS(SELECT id  FROM profiles WHERE login = ? LIMIT 1) AS exist";
    const queryCheck = mysql.format(sqlCheck, [request.body.params.login]);
    connectionPool.query(queryCheck, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        if (Number(data[0]["exist"]) === 0) {
          return response.status(200).json({
            success: false,
            message: "server.there_is_no_user_with_username",
            error: "",
          });
        } else {
          const mailOptions = {
            from: "sexavenuex@gmail.com",
            to: request.body.params.login,
            subject: request.body.params.emailSubject,
            html: request.body.params.html,
          };
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.ru",
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
              user: "sexavenuex@gmail.com",
              pass: "hfqarnmrocxwvxpp",
            },
          });
          transporter.sendMail(mailOptions, (error, _info) => {
            if (error) {
              console.log(error);
              response.status(500).json({
                success: false,
                message: "server.mistake_try_again",
                error: error,
              });
            } else {
              return response.status(200).json({ success: true });
            }
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

export {
  login,
  register,
  authme,
  restorePassword,
  confirmProfile,
  updateProfile,
  deleteProfile,
  getAgencies,
  generateToken,
  changePassword,
};

 
