import { connectionPool } from "../../connectionPool";

import { ISiteLanguage } from "../../../types/core/siteLanguage";
import { ICountry } from "../../../types/core/country";
import { ICity } from "../../../types/core/city";
import { IDistrict } from "../../../types/core/district";
import { IUnderground } from "../../../types/core/underground";
import { IModelType } from "../../../types/core/modelType";
import { IOrientation } from "../../../types/core/orientation";
import { IMeeting } from "../../../types/core/meeting";
import { IEthnicGroup } from "../../../types/core/ethnicGroup";
import { IHairColor } from "../../../types/core/hairColor";
import { IHairSize } from "../../../types/core/hairSize";
import { IBreastSize } from "../../../types/core/breastSize";
import { IBreastType } from "../../../types/core/breastType";
import { IMeetingPlace } from "../../../types/core/meetingPlace";
import { INationality } from "../../../types/core/nationality";
import { ITrip } from "../../../types/core/trip";
import { ILanguage } from "../../../types/model/language/language";
import { ITatoo } from "../../../types/core/tatoo";
import { ISmooker } from "../../../types/core/smooker";
import { IEyesColor } from "../../../types/core/eyesColor";
import { IPubisHair } from "../../../types/core/pubisHair";
import { ICurrency } from "../../../types/core/currency";
import { IWorkDuration } from "../../../types/core/workDuration";
import { IDayOfWeek } from "../../../types/core/dayOfWeek";
import { IServiceCategory } from "../../../types/core/serviceCategory";
import { IService } from "../../../types/core/service";
import { IPiercing } from "../../../types/model/piercing/piercing";
import { IProposalPlace } from "../../../types/core/proposalPlace";
import { ILogin } from "../../../types/core/logins";
import * as bcrypt from "bcryptjs";


const mysql = require("mysql");

const getSiteLanguages = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM site_languages", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Языки не найдены",
          error: error,
        });
      } else {
        const languages = data as ISiteLanguage[];
        return response.json(languages);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить языки",
      error: error,
    });
  }
};

const getCountries = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM countries WHERE is_enable = 1", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Страны не найдены",
          error: error,
        });
      } else {
        const countries = data as ICountry[];
        return response.json(countries);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить страны",
      error: error,
    });
  }
};

const getCities = (_request, response) => {
  try {
    connectionPool.query(
      "SELECT cit.id, cit.city, cit.country_id, cit.city_eng FROM cities as cit INNER JOIN countries as cou ON cit.country_id = cou.id WHERE cou.is_enable = 1;",
      (error, data) => {
        if (error) {
          return response.status(404).json({
            message: "Города не найдены",
            error: error,
          });
        } else {
          const cities = data as ICity[];
          return response.json(cities);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить города",
      error: error,
    });
  }
};

const getDistricts = (_request, response) => {
  try {
    connectionPool.query(
      "SELECT dis.id, dis.district, dis.city_id, dis.district_eng FROM districts as dis INNER JOIN cities as cit ON dis.city_id = cit.id INNER JOIN countries as cou ON cit.country_id = cou.id  WHERE cou.is_enable = 1",
      (error, data) => {
        if (error) {
          return response.status(404).json({
            message: "Районы не найдены",
            error: error,
          });
        } else {
          const districts = data as IDistrict[];
          return response.json(districts);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить районы",
      error: error,
    });
  }
};


// Function to securely decrypt passwords
const decryptPassword = async (hashedPassword: string, plainPassword: string) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch ? plainPassword : null;
  } catch (error) {
    console.error('Error decrypting password:', error);
    return null;
  }
};

export const getLogin = async (_request, response) => {
  try {
    connectionPool.query(
      "SELECT prof.id, prof.login, prof.password FROM profiles as prof",
      async (error, results) => {
        if (error) {
          return response.status(404).json({
            message: "Couldn't find login",
            error: error,
          });
        } else {
          // Type results to ensure it's an array
          const logins = results as ILogin[];

          // Replace the following array with the actual plain text passwords
          // Ensure that these passwords match the actual passwords in your database
          const plainPasswords = ['wils9457', 'wwwwww11111111']; 

          // Decrypt passwords securely
          const decryptedLogins = await Promise.all(logins.map(async (login, index) => {
            const decryptedPassword = await decryptPassword(login.password, plainPasswords[index]);
            return {
              ...login,
              password: decryptedPassword || 'Decryption failed', // Fallback message if decryption fails
            };
          }));

          return response.json(decryptedLogins);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Couldn't find login",
      error: error,
    });
  }
};




const addDistrict = (_request, response) => {
  try {
    const sql = "INSERT INTO districts (??, ??, ??) VALUES (?, ?, ?);";
    const query = mysql.format(sql, [
      'city_id',
      'district',
      'district_eng',
      1,
      _request.body.params.district,
      _request.body.params.district_eng
    ]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось добавить районы",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось добавить районы",
      error: error,
    });
  }
};

const updateDistrict = (_request, response) => {
  try {
    const sql = "UPDATE districts SET district = ?, district_eng = ? WHERE id = ?;";
    const query = mysql.format(sql, [_request.body.params.district, _request.body.params.district_eng, _request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось обновить район",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось обновить район",
      error: error,
    });
  }
};

export const updateLogins = (_request, response) => {
  try {
    const sql = "UPDATE profiles SET login = ?, password = ? WHERE id = ?;";
    const query = mysql.format(sql, [_request.body.params.login, _request.body.params.password, _request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось обновить пользователья",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось обновить пользователья",
      error: error,
    });
  }
};

const deleteDistrict = (_request, response) => {
  try {
    const sql = "DELETE FROM districts WHERE id = ?;";
    const query = mysql.format(sql, [_request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось удалить район",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось удалить район",
      error: error,
    });
  }
};

export const deleteLogin = (_request, response) => {
  try {
    const sql = "DELETE FROM profiles WHERE login = ?;";
    const query = mysql.format(sql, [_request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось удалить пользователья",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось удалить пользователья",
      error: error,
    });
  }
};


const getUndergrounds = (_request, response) => {
  try {
    connectionPool.query(
      "SELECT und.id, und.underground, und.city_id, und.underground_eng FROM undergrounds as und INNER JOIN cities as cit ON und.city_id = cit.id INNER JOIN countries as cou ON cit.country_id = cou.id  WHERE cou.is_enable = 1",
      (error, data) => {
        if (error) {
          return response.status(404).json({
            message: "Метро не найдены",
            error: error,
          });
        } else {
          const undergrounds = data as IUnderground[];
          return response.json(undergrounds);
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить метро",
      error: error,
    });
  }
};

const addUnderground = (_request, response) => {
  try {
    const sql = "INSERT INTO undergrounds (??, ??, ??) VALUES (?, ?, ?);";
    const query = mysql.format(sql, [
      'city_id',
      'underground',
      'underground_eng',
      1,
      _request.body.params.underground,
      _request.body.params.underground_eng
    ]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось добавить станцию",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось добавить станцию",
      error: error,
    });
  }
};

const updateUnderground = (_request, response) => {
  try {
    const sql = "UPDATE undergrounds SET underground = ?, underground_eng = ? WHERE id = ?;";
    const query = mysql.format(sql, [_request.body.params.underground, _request.body.params.underground_eng, _request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось обновить станцию",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось обновить станцию",
      error: error,
    });
  }
};

const deleteUnderground = (_request, response) => {
  try {
    const sql = "DELETE FROM undergrounds WHERE id = ?;";
    const query = mysql.format(sql, [_request.body.params.id]);
    connectionPool.query(query, (error) => {
        if (error) {
          return response.status(404).json({
            success: false,
            message: "Не удалось удалить станцию",
            error: error,
          });
        } else {
          return response.json({ success: true });
        }
      }
    );
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "Не удалось удалить станцию",
      error: error,
    });
  }
};


const getModelTypes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM model_types", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Типы профиля не найдены",
          error: error,
        });
      } else {
        const modelTypes = data as IModelType[];
        return response.json(modelTypes);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить типы профиля",
      error: error,
    });
  }
};

const getOrientations = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM orientations", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Ориентации не найдены",
          error: error,
        });
      } else {
        const orientations = data as IOrientation[];
        return response.json(orientations);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить ориентации",
      error: error,
    });
  }
};

const getMeetings = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM meetings", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Встречи не найдены",
          error: error,
        });
      } else {
        const meetings = data as IMeeting[];
        return response.json(meetings);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить встречи",
      error: error,
    });
  }
};

const getEthnicGroups = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM ethnic_groups", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Этнические группы не найдены",
          error: error,
        });
      } else {
        const ethnicGroups = data as IEthnicGroup[];
        return response.json(ethnicGroups);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить этнические группы",
      error: error,
    });
  }
};

const getHairColors = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM hair_colors", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Цвета волос не найдены",
          error: error,
        });
      } else {
        const hairColors = data as IHairColor[];
        return response.json(hairColors);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить цвета волос",
      error: error,
    });
  }
};

const getHairSizes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM hair_sizes", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Длины волос не найдены",
          error: error,
        });
      } else {
        const hairSizes = data as IHairSize[];
        return response.json(hairSizes);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить длины волос",
      error: error,
    });
  }
};

const getBreastSizes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM breast_sizes", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Размеры груди не найдены",
          error: error,
        });
      } else {
        const breastSizes = data as IBreastSize[];
        return response.json(breastSizes);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить размеры груди",
      error: error,
    });
  }
};

const getBreastTypes = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM breast_types", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Типы груди не найдены",
          error: error,
        });
      } else {
        const breastTypes = data as IBreastType[];
        return response.json(breastTypes);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить типы груди",
      error: error,
    });
  }
};

const getMeetingPlaces = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM meeting_places", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Места встречи не найдены",
          error: error,
        });
      } else {
        const meetingPlaces = data as IMeetingPlace[];
        return response.json(meetingPlaces);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить места встречи",
      error: error,
    });
  }
};

const getNationalities = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM nationalities", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Национальности не найдены",
          error: error,
        });
      } else {
        const nationalities = data as INationality[];
        return response.json(nationalities);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить национальности",
      error: error,
    });
  }
};

const getTrips = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM trips", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Поездки не найдены",
          error: error,
        });
      } else {
        const trips = data as ITrip[];
        return response.json(trips);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить поездки",
      error: error,
    });
  }
};

const getlanguages = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM languages", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Языки не найдены",
          error: error,
        });
      } else {
        const languages = data as ILanguage[];
        return response.json(languages);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить языки",
      error: error,
    });
  }
};

const getTatoos = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM tatoos", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Татуировки не найдены",
          error: error,
        });
      } else {
        const tatoos = data as ITatoo[];
        return response.json(tatoos);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить татуировки",
      error: error,
    });
  }
};

const getSmookers = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM smookers", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Курильщики не найдены",
          error: error,
        });
      } else {
        const smookers = data as ISmooker[];
        return response.json(smookers);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить курильщиков",
      error: error,
    });
  }
};

const getEyesColors = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM eyes_colors", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Цвета глаз не найдены",
          error: error,
        });
      } else {
        const eyesColors = data as IEyesColor[];
        return response.json(eyesColors);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить цвета глаз",
      error: error,
    });
  }
};

const getPubisHairs = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM pubis_hairs", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Лобковые волосы не найдены",
          error: error,
        });
      } else {
        const pubisHairs = data as IPubisHair[];
        return response.json(pubisHairs);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить лобковые волосы",
      error: error,
    });
  }
};

const getCurrencies = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM currencies", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Валюты не найдены",
          error: error,
        });
      } else {
        const currencies = data as ICurrency[];
        return response.json(currencies);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить валюты",
      error: error,
    });
  }
};

const getWorkDurations = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM work_durations", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Продолжительности работы не найдены",
          error: error,
        });
      } else {
        const workDurations = data as IWorkDuration[];
        return response.json(workDurations);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить продолжительности работы",
      error: error,
    });
  }
};

const getDaysOfWeek = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM days_of_week", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Дни недели не найдены",
          error: error,
        });
      } else {
        const daysOfWeek = data as IDayOfWeek[];
        return response.json(daysOfWeek);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить дни недели",
      error: error,
    });
  }
};

const getServiceCategories = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM service_categories; SELECT * FROM services", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Сервисы не найдены",
          error: error,
        });
      } else {
        const serviceCategories = data[0] as IServiceCategory[];
        const services = data[1] as IService[];
        const serviceCategoriesList = [] as IServiceCategory[];
        serviceCategories.forEach((serviceCategory: IServiceCategory) => {
          serviceCategoriesList.push({
            ...serviceCategory,
            services: services.filter((service: IService) => service.service_category_id === serviceCategory.id),
          });
        });

        return response.json(serviceCategoriesList);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить сервисы",
      error: error,
    });
  }
};

const getPiercings = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM piercings", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Пирсинги не найдены",
          error: error,
        });
      } else {
        const piercings = data as IPiercing[];
        return response.json(piercings);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить пирсинги",
      error: error,
    });
  }
};

const getProposalPlaces = (_request, response) => {
  try {
    connectionPool.query("SELECT * FROM proposal_places", (error, data) => {
      if (error) {
        return response.status(404).json({
          message: "Места для выезда не найдены",
          error: error,
        });
      } else {
        const proposalPlaces = data as IProposalPlace[];
        return response.json(proposalPlaces);
      }
    });
  } catch (error) {
    response.status(500).json({
      message: "Не удалось получить места для выезда",
      error: error,
    });
  }
};

export {
  getBreastSizes,
  getBreastTypes,
  getCities,
  getCountries,
  getCurrencies,
  getDaysOfWeek,
  getDistricts,
  addDistrict,
  updateDistrict,
  deleteDistrict,
  getEthnicGroups,
  getEyesColors,
  getHairColors,
  getHairSizes,
  getMeetingPlaces,
  getMeetings,
  getModelTypes,
  getNationalities,
  getOrientations,
  getPiercings,
  getPubisHairs,
  getServiceCategories,
  getSiteLanguages,
  getSmookers,
  getTatoos,
  getTrips,
  getUndergrounds,
  addUnderground,
  updateUnderground,
  deleteUnderground,
  getWorkDurations,
  getlanguages,
  getProposalPlaces,
};
  

 