import { IContact } from "../contact/contact";
import { IModelPiercing } from "../piercing/modelPiercing";
import { IPhoto } from "../photo/photo";
import { IVideo } from "../video/video";
import { IBlockedCountry } from "../blockedCountry/blockedCountry";
import { ITarif } from "../tarif/tarif";
import { IWorkTime } from "../workTime/workTime";
import { IModelService } from "../modelService/modelService";
import { IModel } from "./model";
import { IModelLanguage } from "../language/modelLanguage";
import { IModelFeedback } from "../modelFeedback/modelFeedback";
import { IModelProposalPlace } from "../modelProposalPlace/modelProposalPlace";

export function initModel(): IModel {
  const defaults = {
    id: -1,
    agency_id: -1,
    name: "",
    about_self: "",
    age: 0,
    type_id: -1,
    height: 0,
    weight: 0,
    country_id: 1,
    city_id: 4,
    district_id: -1,
    underground_id: -1,
    orientation_id: -1,
    meeting_id: -1,
    ethnic_group_id: -1,
    hair_color_id: -1,
    hair_size_id: -1,
    breast_size_id: -1,
    breast_type_id: -1,
    meeting_place_id: -1,
    nationality_id: -1,
    trip_id: -1,
    tatoo_id: -1,
    smooker_id: -1,
    eyes_color_id: -1,
    pubis_hair_id: -1,
    contacts: [
      {
        id: 0,
        phone_number: "",
        is_telegram_enable: false,
        is_whatsapp_enable: false,
        is_wechat_enable: false,
        is_botim_enable: false,
      } as IContact,
    ] as IContact[],
    photos: [] as IPhoto[],
    videos: [] as IVideo[],
    model_piercings: [] as IModelPiercing[],
    blocked_countries: [] as IBlockedCountry[],
    model_languages: [] as IModelLanguage[],
    is_vip: false,
    is_pornstar: -1,
    is_enable: false,
    is_enable_by_moderator: true,
    currency_id: 1,
    tarifs: [] as ITarif[],
    time_zone: -100,
    work_times: [] as IWorkTime[],
    model_services: [] as IModelService[],
    last_online: new Date(),
    is_verified: false,
    create_date: new Date(),
    is_payed: false,
    last_position_update: new Date(),
    model_feedbacks: [] as IModelFeedback[],
    model_proposal_places: [] as IModelProposalPlace[],
    positionsUpLeft: 6,
  };

  return {
    ...defaults,
  };
}
