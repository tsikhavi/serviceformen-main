import { unlink } from "fs";

import { connectionPool } from "../../../connectionPool";

import Config from "../../../../../serverConfig";

import { IModel } from "../../../../types/model/model/model";
import { IContact } from "../../../../types/model/contact/contact";
import { IModelPiercing } from "../../../../types/model/piercing/modelPiercing";
import { IBlockedCountry } from "../../../../types/model/blockedCountry/blockedCountry";
import { IPhoto } from "../../../../types/model/photo/photo";
import { ITarif } from "../../../../types/model/tarif/tarif";
import { IWorkTime } from "../../../../types/model/workTime/workTime";
import { IModelService } from "../../../../types/model/modelService/modelService";
import { IVideo } from "../../../../types/model/video/video";
import { IModelLanguage } from "../../../../types/model/language/modelLanguage";
import { IModelView } from "../../../../types/model/modelView/modelView";
import { IModelFeedback } from "../../../../types/model/modelFeedback/modelFeedback";
import { IModelProposalPlace } from "../../../../types/model/modelProposalPlace/modelProposalPlace";

const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const getModelsForAll = (request, response) => {
  const sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models WHERE is_enable = 1 AND is_enable_by_moderator = 1 ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
  const query = mysql.format(sql, [new Date(), request.query.profile_id]);
  return getModels(response, query)
}

const getModelsForAgency = (request, response) => {
  const sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models WHERE agency_id = ? ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
  const query = mysql.format(sql, [new Date(), request.query.profile_id, request.query.profile_id]);
  return getModels(response, query)
}

const getModelsForAdmin = (request, response) => {
  const sql = "UPDATE models SET last_online = ? WHERE agency_id = ?; SELECT * FROM models ORDER BY last_position_update DESC; SELECT * FROM contacts; SELECT * FROM model_piercings; SELECT * FROM blocked_countries; SELECT * FROM photos ORDER BY is_main DESC, type DESC, status DESC; SELECT * FROM tarifs; SELECT * FROM work_times; SELECT * FROM model_services; SELECT * FROM videos ORDER BY status DESC; SELECT * FROM model_languages; SELECT * FROM model_feedbacks ORDER BY create_date DESC; SELECT * FROM model_proposal_places;";
  const query = mysql.format(sql, [new Date(), request.query.profile_id]);
  return getModels(response, query)
}

const getModels = (response, query) => {
  try {
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ошибка при получении моделей",
          error: error,
        });
      } else {
        const models = data[1] as IModel[];
        const contacts = data[2] as IContact[];
        const modelPiercings = data[3] as IModelPiercing[];
        const blockedCountries = data[4] as IBlockedCountry[];
        const photos = data[5] as IPhoto[];
        const tarifs = data[6] as ITarif[];
        const workTimes = data[7] as IWorkTime[];
        const modelServices = data[8] as IModelService[];
        const videos = data[9] as IVideo[];
        const modelLanguages = data[10] as IModelLanguage[];
        const modelFeedbacks = data[11] as IModelFeedback[];
        const modelProposalPlaces = data[12] as IModelProposalPlace[];
        const modelsList = [] as IModel[];
        models.forEach((model: IModel) => {
          modelsList.push({
            ...model,
            contacts: contacts.filter((contact: IContact) => contact.model_id === model.id) as IContact[],
            model_piercings: modelPiercings.filter(
              (modelPiercing: IModelPiercing) => modelPiercing.model_id === model.id
            ) as IModelPiercing[],
            blocked_countries: blockedCountries.filter(
              (blockedCountry: IBlockedCountry) => blockedCountry.model_id === model.id
            ) as IBlockedCountry[],
            photos: photos.filter((photo: IPhoto) => photo.model_id === model.id) as IPhoto[],
            tarifs: tarifs.filter((tarif: ITarif) => tarif.model_id === model.id) as ITarif[],
            work_times: workTimes.filter((workTime: IWorkTime) => workTime.model_id === model.id) as IWorkTime[],
            model_services: modelServices.filter(
              (modelService: IModelService) => modelService.model_id === model.id
            ) as IModelService[],
            videos: videos.filter((video: IVideo) => video.model_id === model.id) as IVideo[],
            model_languages: modelLanguages.filter(
              (modelLanguage: IModelLanguage) => modelLanguage.model_id === model.id
            ) as IModelLanguage[],
            model_feedbacks: modelFeedbacks.filter(
              (modelFeedback: IModelFeedback) => modelFeedback.model_id === model.id
            ) as IModelFeedback[],
            model_proposal_places: modelProposalPlaces.filter(
              (modelProposalPlace: IModelProposalPlace) => modelProposalPlace.model_id === model.id
            ) as IModelProposalPlace[],
          });
        });
        return response.json(modelsList);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить модели",
      error: error,
    });
  }
};

const getModelViews = (request, response) => {
  try {
    const modelId = request.query.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "SELECT * FROM model_views WHERE model_id = ?";
    const query = mysql.format(sql, [request.query.model_id]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ошибка при получении просмотров модели",
          error: error,
        });
      } else {
        const modelViews = data as IModelView[];
        return response.json(modelViews);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить просмотры модели",
      error: error,
    });
  }
};

const addModel = (request, response) => {
  try {
    const sql =
      "INSERT INTO models (??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
    const query = mysql.format(sql, [
      "name",
      "about_self",
      "agency_id",
      "age",
      "height",
      "weight",
      "country_id",
      "city_id",
      "district_id",
      "underground_id",
      "type_id",
      "orientation_id",
      "meeting_id",
      "ethnic_group_id",
      "hair_color_id",
      "hair_size_id",
      "breast_size_id",
      "breast_type_id",
      "meeting_place_id",
      "nationality_id",
      "trip_id",
      "smooker_id",
      "eyes_color_id",
      "pubis_hair_id",
      "is_pornstar",
      "tatoo_id",
      "last_online",
      "create_date",
      "currency_id",
      request.body.params.model.name,
      request.body.params.model.about_self,
      request.body.params.model.agency_id,
      request.body.params.model.age,
      request.body.params.model.height,
      request.body.params.model.weight,
      request.body.params.model.country_id,
      request.body.params.model.city_id,
      request.body.params.model.district_id,
      request.body.params.model.underground_id,
      request.body.params.model.type_id,
      request.body.params.model.orientation_id,
      request.body.params.model.meeting_id,
      request.body.params.model.ethnic_group_id,
      request.body.params.model.hair_color_id,
      request.body.params.model.hair_size_id,
      request.body.params.model.breast_size_id,
      request.body.params.model.breast_type_id,
      request.body.params.model.meeting_place_id,
      request.body.params.model.nationality_id,
      request.body.params.model.trip_id,
      request.body.params.model.smooker_id,
      request.body.params.model.eyes_color_id,
      request.body.params.model.pubis_hair_id,
      request.body.params.model.is_pornstar,
      request.body.params.model.tatoo_id,
      new Date(),
      new Date(),
      request.body.params.model.currency_id,
    ]);
    connectionPool.query(query, (error, data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const model_id = data["insertId"];
        let sqlSecond = "DELETE FROM contacts WHERE ?? = ?; ";
        const values = ["model_id", model_id] as string[];
        request.body.params.model.contacts.forEach((contact) => {
          sqlSecond += "INSERT INTO contacts (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?); ";
          values.push(
            "model_id",
            "phone_number",
            "is_telegram_enable",
            "is_whatsapp_enable",
            "is_wechat_enable",
            "is_botim_enable",
            model_id,
            contact.phone_number,
            contact.is_telegram_enable,
            contact.is_whatsapp_enable,
            contact.is_wechat_enable,
            contact.is_botim_enable
          );
        });
        sqlSecond += "DELETE FROM blocked_countries WHERE ?? = ?; ";
        values.push("model_id", model_id);
        request.body.params.model.blocked_countries.forEach((blockedCountry) => {
          sqlSecond += "INSERT INTO blocked_countries (??, ??) VALUES (?, ?); ";
          values.push("model_id", "country_id", model_id, blockedCountry.country_id);
        });
        sqlSecond += "DELETE FROM model_piercings WHERE ?? = ?; ";
        values.push("model_id", model_id);
        request.body.params.model.model_piercings.forEach((modelPiercing) => {
          sqlSecond += "INSERT INTO model_piercings (??, ??) VALUES (?, ?); ";
          values.push("model_id", "piercing_id", model_id, modelPiercing.piercing_id);
        });
        sqlSecond += "DELETE FROM model_languages WHERE ?? = ?; ";
        values.push("model_id", model_id);
        request.body.params.model.model_languages.forEach((modelLanguage) => {
          sqlSecond += "INSERT INTO model_languages (??, ??) VALUES (?, ?); ";
          values.push("model_id", "language_id", model_id, modelLanguage.language_id);
        });
        sqlSecond += "DELETE FROM model_proposal_places WHERE ?? = ?; ";
        values.push("model_id", model_id);
        request.body.params.model.model_proposal_places.forEach((modelProposalPlace) => {
          sqlSecond += "INSERT INTO model_proposal_places (??, ??) VALUES (?, ?); ";
          values.push("model_id", "place_id", model_id, modelProposalPlace.place_id);
        });
        const query = mysql.format(sqlSecond, values);
        connectionPool.query(query, (error) => {
          if (error) {
            return response.status(404).json({
              success: false,
              message: "server.mistake_try_again",
              error: error,
            });
          } else {
            return response.status(200).json({ success: true, model_id: model_id });
          }
        });
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

const updateModel = (request, response) => {
  try {
    const modelId = request.body.params.model.id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql =
      "UPDATE models SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?;";
    const query = mysql.format(sql, [
      "name",
      request.body.params.model.name,
      "about_self",
      request.body.params.model.about_self,
      "agency_id",
      request.body.params.model.agency_id,
      "age",
      request.body.params.model.age,
      "height",
      request.body.params.model.height,
      "weight",
      request.body.params.model.weight,
      "country_id",
      request.body.params.model.country_id,
      "city_id",
      request.body.params.model.city_id,
      "district_id",
      request.body.params.model.district_id,
      "underground_id",
      request.body.params.model.underground_id,
      "type_id",
      request.body.params.model.type_id,
      "orientation_id",
      request.body.params.model.orientation_id,
      "meeting_id",
      request.body.params.model.meeting_id,
      "ethnic_group_id",
      request.body.params.model.ethnic_group_id,
      "hair_color_id",
      request.body.params.model.hair_color_id,
      "hair_size_id",
      request.body.params.model.hair_size_id,
      "breast_size_id",
      request.body.params.model.breast_size_id,
      "breast_type_id",
      request.body.params.model.breast_type_id,
      "meeting_place_id",
      request.body.params.model.meeting_place_id,
      "nationality_id",
      request.body.params.model.nationality_id,
      "trip_id",
      request.body.params.model.trip_id,
      "smooker_id",
      request.body.params.model.smooker_id,
      "eyes_color_id",
      request.body.params.model.eyes_color_id,
      "pubis_hair_id",
      request.body.params.model.pubis_hair_id,
      "is_pornstar",
      request.body.params.model.is_pornstar,
      "tatoo_id",
      request.body.params.model.tatoo_id,
      "id",
      request.body.params.model.id,
    ]);
    connectionPool.query(query, (error, _data) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        let sqlSecond = "DELETE FROM contacts WHERE ?? = ?; ";
        const values = ["model_id", request.body.params.model.id] as string[];
        request.body.params.model.contacts.forEach((contact) => {
          sqlSecond += "INSERT INTO contacts (??, ??, ??, ??, ??, ??) VALUES (?, ?, ?, ?, ?, ?); ";
          values.push(
            "model_id",
            "phone_number",
            "is_telegram_enable",
            "is_whatsapp_enable",
            "is_wechat_enable",
            "is_botim_enable",
            contact.model_id,
            contact.phone_number,
            contact.is_telegram_enable,
            contact.is_whatsapp_enable,
            contact.is_wechat_enable,
            contact.is_botim_enable
          );
        });
        sqlSecond += "DELETE FROM blocked_countries WHERE ?? = ?; ";
        values.push("model_id", request.body.params.model.id);
        request.body.params.model.blocked_countries.forEach((blockedCountry) => {
          sqlSecond += "INSERT INTO blocked_countries (??, ??) VALUES (?, ?); ";
          values.push("model_id", "country_id", request.body.params.model.id, blockedCountry.country_id);
        });
        sqlSecond += "DELETE FROM model_piercings WHERE ?? = ?; ";
        values.push("model_id", request.body.params.model.id);
        request.body.params.model.model_piercings.forEach((modelPiercing) => {
          sqlSecond += "INSERT INTO model_piercings (??, ??) VALUES (?, ?); ";
          values.push("model_id", "piercing_id", request.body.params.model.id, modelPiercing.piercing_id);
        });
        sqlSecond += "DELETE FROM model_languages WHERE ?? = ?; ";
        values.push("model_id", request.body.params.model.id);
        request.body.params.model.model_languages.forEach((modelLanguage) => {
          sqlSecond += "INSERT INTO model_languages (??, ??) VALUES (?, ?); ";
          values.push("model_id", "language_id", request.body.params.model.id, modelLanguage.language_id);
        });
        sqlSecond += "DELETE FROM model_proposal_places WHERE ?? = ?; ";
        values.push("model_id", request.body.params.model.id);
        request.body.params.model.model_proposal_places.forEach((modelProposalPlace) => {
          sqlSecond += "INSERT INTO model_proposal_places (??, ??) VALUES (?, ?); ";
          values.push("model_id", "place_id", request.body.params.model.id, modelProposalPlace.place_id);
        });
        const query = mysql.format(sqlSecond, values);
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
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "server.mistake_try_again",
      error: error,
    });
  }
};

const updateModelEnable = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "UPDATE models SET ?? = ? WHERE id = ?;";
    const query = mysql.format(sql, ["is_enable", request.body.params.is_enable, request.body.params.model_id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Ошибка при обновлении статуса модели",
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
      message: "Не удалось обновить статус модели",
      error: error,
    });
  }
};

const updateModelEnableByModerator = (request, response) => {
  try {
    const sql = "UPDATE models SET ?? = ? WHERE id = ?;";
    const query = mysql.format(sql, ["is_enable_by_moderator", request.body.params.is_enable_by_moderator, request.body.params.model_id]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Ошибка при обновлении статуса модели",
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
      message: "Не удалось обновить статус модели",
      error: error,
    });
  }
};

const updateModelCurrencyTimezone = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql = "UPDATE models SET ?? = ?, ?? = ? WHERE id = ?;";
    const query = mysql.format(sql, [
      "currency_id",
      request.body.params.currency_id,
      "time_zone",
      request.body.params.time_zone,
      request.body.params.model_id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Ошибка при обновлении валюты и часового пояса модели",
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
      message: "Не удалось обновить валюту и часовой пояс модели",
      error: error,
    });
  }
};

const deleteModel = (request, response) => {
  try {
    const modelId = request.body.params.model_id
    if (!request.isAdmin && !(request.models && modelId && request.models.includes(+modelId))) {
      return response.status(500).json({
        success: false,
        message: "server.mistake_try_again",
      });
    }

    const sql =
      "DELETE FROM models WHERE id = ?; DELETE FROM photos WHERE model_id = ?; DELETE FROM contacts WHERE model_id = ?; DELETE FROM videos WHERE model_id = ?; DELETE FROM model_piercings WHERE model_id = ?; DELETE FROM blocked_countries WHERE model_id = ?; DELETE FROM tarifs WHERE model_id = ?; DELETE FROM model_services WHERE model_id = ?; DELETE FROM work_times WHERE model_id = ?; DELETE FROM model_languages WHERE model_id = ?; ";
    const query = mysql.format(sql, [
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
      request.body.params.model_id,
    ]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "server.mistake_try_again",
          error: error,
        });
      } else {
        const directory = path.join(Config.directory, "uploads");
        request.body.params.photos.forEach((photo) => {
          if (fs.existsSync(path.join(directory, photo.photo_url))) {
            unlink(path.join(directory, photo.photo_url), (error) => {
              if (error) console.log(error);
            });
          }
        });
        request.body.params.videos.forEach((video) => {
          if (fs.existsSync(path.join(directory, video.video_url))) {
            unlink(path.join(directory, video.video_url), (error) => {
              if (error) console.log(error);
            });
          }
        });
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

const addModelView = (request, response) => {
  try {
    const sql = "INSERT INTO model_views (??, ??) values (?, ?);";
    const query = mysql.format(sql, ["model_id", "view_date", request.body.params.model_id, new Date()]);
    connectionPool.query(query, (error) => {
      if (error) {
        return response.status(404).json({
          success: false,
          message: "Ошибка при добавлении просмотра страницы модели",
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
      message: "Не удалось добавить просмотр страницы модели",
      error: error,
    });
  }
};

export {
  getModelsForAll,
  getModelsForAgency,
  getModelsForAdmin,
  getModelViews,
  getModels,
  addModel,
  addModelView,
  updateModel,
  updateModelCurrencyTimezone,
  updateModelEnable,
  updateModelEnableByModerator,
  deleteModel,
};
