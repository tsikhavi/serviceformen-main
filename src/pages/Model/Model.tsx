import { useEffect, useState, useLayoutEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Media from "./content/media/Media";
import FeedbacksContent from "./content/feedback/Feedback";

import globalStyles from "../../App.module.sass";
import styles from "./Model.module.sass";

import { ServerStatusType } from "../../enums/serverStatusType";

import { IModel } from "../../types/model/model/model";
import { initModel } from "../../types/model/model/initModel";
import { IContact } from "../../types/model/contact/contact";
import { ICountry } from "../../types/core/country";
import { ICity } from "../../types/core/city";
import { IDistrict } from "../../types/core/district";
import { IUnderground } from "../../types/core/underground";
import { IBreastSize } from "../../types/core/breastSize";
import { IBreastType } from "../../types/core/breastType";
import { IModelType } from "../../types/core/modelType";
import { IHairColor } from "../../types/core/hairColor";
import { IHairSize } from "../../types/core/hairSize";
import { IPubisHair } from "../../types/core/pubisHair";
import { IMeeting } from "../../types/core/meeting";
import { IEthnicGroup } from "../../types/core/ethnicGroup";
import { INationality } from "../../types/core/nationality";
import { IModelService } from "../../types/model/modelService/modelService";
import { IServiceCategory } from "../../types/core/serviceCategory";
import { IService } from "../../types/core/service";
import { ITrip } from "../../types/core/trip";
import { ITatoo } from "../../types/core/tatoo";
import { IEyesColor } from "../../types/core/eyesColor";
import { ISmooker } from "../../types/core/smooker";
import { IPiercing } from "../../types/model/piercing/piercing";
import { IModelPiercing } from "../../types/model/piercing/modelPiercing";
import { ICurrency } from "../../types/core/currency";
import { IWorkTime } from "../../types/model/workTime/workTime";
import { IDayOfWeek } from "../../types/core/dayOfWeek";
import { ITarif } from "../../types/model/tarif/tarif";
import { IMeetingPlace } from "../../types/core/meetingPlace";
import { IWorkDuration } from "../../types/core/workDuration";
import { ILanguage } from "../../types/model/language/language";
import { IModelLanguage } from "../../types/model/language/modelLanguage";

import { Location as LocationIcon } from "../../assets/Location";
import { Phone as PhoneIcon } from "../../assets/Phone";
import { Telegram as TelegramIcon } from "../../assets/Telegram";
import { Whatsapp as WhatsappIcon } from "../../assets/Whatsapp";
import { Botim as BotimIcon } from "../../assets/Botim";
import { Wechat as WechatIcon } from "../../assets/Wechat";
import { Check as CheckIcon } from "../../assets/Check";
import { Close as CloseIcon } from "../../assets/Close";
import { IOrientation } from "src/types/core/orientation";

const Model = ({ forModerator = false }) => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    setActiveHeaderLink,
    addModelView,
    updateModelEnableByModerator,
    updateModelByModerator,
    authMeAdmin
  } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const models = useTypedSelector((state) => state.modelReducer.models);
  const serviceCategories = useTypedSelector((state) => state.coreReducer.serviceCategories);
  const currencies = useTypedSelector((state) => state.coreReducer.currencies);
  const countries = useTypedSelector((state) => state.coreReducer.countries);
  const cities = useTypedSelector((state) => state.coreReducer.cities);
  const districts = useTypedSelector((state) => state.coreReducer.districts);
  const undergrounds = useTypedSelector((state) => state.coreReducer.undergrounds);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);
  const breastSizes = useTypedSelector((state) => state.coreReducer.breastSizes);
  const breastTypes = useTypedSelector((state) => state.coreReducer.breastTypes);
  const hairColors = useTypedSelector((state) => state.coreReducer.hairColors);
  const hairSizes = useTypedSelector((state) => state.coreReducer.hairSizes);
  const pubisHairs = useTypedSelector((state) => state.coreReducer.pubisHairs);
  const meetings = useTypedSelector((state) => state.coreReducer.meetings);
  const ethnicGroups = useTypedSelector((state) => state.coreReducer.ethnicGroups);
  const nationalities = useTypedSelector((state) => state.coreReducer.nationalities);
  const trips = useTypedSelector((state) => state.coreReducer.trips);
  const tatoos = useTypedSelector((state) => state.coreReducer.tatoos);
  const piercings = useTypedSelector((state) => state.coreReducer.piercings);
  const smookers = useTypedSelector((state) => state.coreReducer.smookers);
  const eyesColors = useTypedSelector((state) => state.coreReducer.eyesColors);
  const daysOfWeek = useTypedSelector((state) => state.coreReducer.daysOfWeek);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);
  const workDurations = useTypedSelector((state) => state.coreReducer.workDurations);
  const languages = useTypedSelector((state) => state.coreReducer.languages);
  const orientations = useTypedSelector((state) => state.coreReducer.orientations);
  const [model, setModelData] = useState(initModel());
  const [modelAbout, setModelAbout] = useState(initModel().about_self);
  const [modelServices, setModelServices] = useState([] as IModelService[]);
  const [modelWorkTimes, setModelWorkTimes] = useState([] as IWorkTime[]);
  const [modelTarifs, setModelTarifs] = useState([] as ITarif[]);
  const [showedPhoneNumbers, setShowedPhoneNumbers] = useState([] as number[]);
  const [isModelViewed, setIsModelViewed] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const isAuth = useTypedSelector((state) => state.adminReducer.isAuth);
  const adminStatuses = useTypedSelector((state) => state.adminReducer.serverStatuses);
  const [isModelEnable, setIsModelEnable] = useState(model.is_enable_by_moderator);

  useEffect(() => {
    setActiveHeaderLink(-1);
  }, []);

  
  useLayoutEffect(() => {
    // logout();
    if (isAuth) {
      if (adminStatuses.authMe.status === ServerStatusType.None) {
        authMeAdmin();
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (models.filter((model: IModel) => model.id === Number(id)).length > 0) {
      const tmpModel = models.filter((model: IModel) => model.id === Number(id))[0];
      setModelData(tmpModel);
      setModelAbout(tmpModel.about_self)
      document.title = `${tmpModel.name} (${tmpModel.age})`;
      setIsOnline(calcIsOnline());
      if (!isModelViewed) {
        addModelView({ model_id: tmpModel.id });
        setIsModelViewed(true);
      }
    } else {
      setModelData(initModel());
    }
  }, [id, models]);

  useEffect(() => {
    setModelAbout(modelAbout)
  }, [modelAbout]);

  
  const updateAboutData = (aboutData: string) => {
    setModelAbout(aboutData)
    updateModelByModerator({ model: { ...model, about_self: aboutData } })
  };


  useEffect(() => {
    var tmpServices = [] as IModelService[];
    if (serviceCategories && serviceCategories.length > 0 && model.model_services) {
      serviceCategories.map((serviceCategory: IServiceCategory) =>
        serviceCategory.services.map((service: IService) =>
          tmpServices.push({
            id:
              model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
                ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.id
                : model.model_services.length === 0
                ? service.id
                : Math.max(...model.model_services.map((modelService: IModelService) => modelService.id)) + service.id,
            category_id: serviceCategory.id,
            service_id: service.id,
            model_id: model.id,
            price:
              model.model_services.filter((modelService: IModelService) => modelService.service_id === service.id).length > 0
                ? model.model_services.find((modelService: IModelService) => modelService.service_id === service.id)!.price
                : -1,
          } as IModelService)
        )
      );
    }
    setModelServices(tmpServices);
  }, [model, model.model_services, serviceCategories]);

  useEffect(() => {
    var tmpWorkTimes = [] as IWorkTime[];
    if (daysOfWeek && daysOfWeek.length > 0 && model.work_times) {
      daysOfWeek.map((dayOfWeek: IDayOfWeek) => {
        tmpWorkTimes.push(
          model.work_times.filter(
            (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
          ).length > 0
            ? (model.work_times.find(
                (workTime: IWorkTime) => workTime.model_id === model.id && workTime.day_of_week_id === dayOfWeek.id
              ) as IWorkTime)
            : ({
                id:
                  model.work_times.length === 0
                    ? dayOfWeek.id
                    : Math.max(...model.work_times.map((workTime: IWorkTime) => workTime.id)) + dayOfWeek.id,
                time_start: "",
                time_end: "",
                model_id: model.id,
                day_of_week_id: dayOfWeek.id,
                is_all_day: false,
              } as IWorkTime)
        );
      });
      setModelWorkTimes(tmpWorkTimes);
    }
  }, [model, model.work_times, daysOfWeek]);

  useEffect(() => {
    var tmpTarifs = [] as ITarif[];
    if (meetingPlaces && meetingPlaces.length > 0 && workDurations && workDurations.length > 0 && model.tarifs) {
      const meetingPlace = meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id);
      meetingPlaces.map((meetingPlace: IMeetingPlace) => {
        workDurations.map((workDuration: IWorkDuration) => {
          tmpTarifs.push(
            model.tarifs.filter(
              (tariff: ITarif) => tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
            ).length > 0
              ? (model.tarifs.find(
                  (tariff: ITarif) =>
                    tariff.meeting_place_id === meetingPlace.id && tariff.work_duration_id === workDuration.id
                ) as ITarif)
              : ({
                  id:
                    model.tarifs.length === 0
                      ? (meetingPlace.id + 10) * (workDuration.id + 1) + workDuration.id
                      : Math.max(...model.tarifs.map((tarif: ITarif) => tarif.id)) +
                        (meetingPlace.id + 10) * (workDuration.id + 1) +
                        workDuration.id,
                  meeting_place_id: meetingPlace.id,
                  work_duration_id: workDuration.id,
                  price: 0,
                  model_id: model.id,
                } as ITarif)
          );
        });
      });
      setModelTarifs(
        meetingPlace?.meeting_place == "Аппартаменты" || meetingPlace?.meeting_place == "Выезд"
          ? tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id === meetingPlace?.id)
          : tmpTarifs.filter((tariff: ITarif) => tariff.meeting_place_id !== meetingPlace?.id)
      );
    } else {
      setModelTarifs(tmpTarifs);
    }
  }, [model, model.tarifs, meetingPlaces, workDurations]);

  const handleShowPhoneNumberClick = (contact_id: number) => {
    setShowedPhoneNumbers([...showedPhoneNumbers, contact_id]);
  };

  const makeHiddenPhoneNumber = (phoneNumber: string) => {
    var replacedStr = phoneNumber.substring(9, 15);
    return phoneNumber.replace(replacedStr, "XXX-XX");
  };

  const calcIsOnline = () => {
    const now = new Date();
    const lastOnline = new Date(model.last_online);
    const difference = Math.abs(now.getTime() - lastOnline.getTime()) / (1000 * 60);
    const check = difference < 3
    return check;
  };

  const changePhoneNumber = (phoneNumber: string) => {
    return phoneNumber
      .trim()
      .replaceAll(" ", "")
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", "")
      .replaceAll("+", "");
  };

  useEffect(() => {
    if (model.is_enable_by_moderator !== isModelEnable) {
      updateModelEnableByModerator({ model_id: model.id, is_enable_by_moderator: isModelEnable });
    }
  }, [isModelEnable, model]);

  return (
    <>
      {forModerator ? <div className={styles.previous_page_button} onClick={() => navigate(-1)}>{'  < Предыдущая страница'}</div> : null}
      {model.name !== "" && (
        <div className={styles.wrapper_content}>
          {windowSize.innerWidth > 1450 && <Media model={model} />}
          <div className={styles.info}>
            <div className={styles.name}>
              {windowSize.innerWidth < 1451 && (
                <div className={styles.statuses}>
                  {model.is_vip ? <div className={styles.empty_vip} /> : null}
                  <div className={styles.empty_online} />
                </div>
              )}
              {model.name}
              <div className={styles.statuses}>
                {model.is_vip ? <div className={styles.vip}>VIP</div> : ""}
                <div
                  className={`${isOnline ? styles.online : styles.offline}`}
                  title={isOnline ? t("model.online") : t("model.offline")}
                />
              </div>
            </div>
            <div className={styles.location}>
              <LocationIcon fill="#98042D" />
              {model.district_id === -1
                ? t("global.not_specified_m")
                : i18n.resolvedLanguage === "ru"
                ? districts.find((district: IDistrict) => district.id === model.district_id)?.district
                : districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
            </div>
            {windowSize.innerWidth < 1451 && <Media model={model} />}
            {model.about_self !== "" && (
              <div className={styles.about_self}>
                <span>{t("model.about_me")}</span>
                {
                  forModerator
                    ? <textarea
                        className={styles.about_self_content}
                        placeholder=""
                        onChange={(event) => updateAboutData(event.target.value)}
                        value={modelAbout}
                      />
                    : <div className={styles.about_self_content}>
                        <i>{model.about_self}</i>
                      </div>
                }
              </div>
            )}
            <div className={styles.parts}>
              <div className={styles.part + " " + styles.full_width}>
                {t("model.detailed_information")}
                <div className={styles.content}>
                  {model.contacts.map((contact: IContact) => (
                    <div className={styles.contacts}>
                      {showedPhoneNumbers.filter((item: number) => item === contact.id).length > 0 && (
                        <div className={styles.phone}>
                          <PhoneIcon />
                          <a
                            className={`${styles.phone}`}
                            href={`tel:+${changePhoneNumber(contact.phone_number)}`}
                            onClick={(event) => event?.stopPropagation()}
                          >
                            {contact.phone_number}
                          </a>
                        </div>
                      )}
                      {showedPhoneNumbers.filter((item: number) => item === contact.id).length === 0 && (
                        <div className={styles.phone}>
                          <PhoneIcon />
                          {makeHiddenPhoneNumber(contact.phone_number)}
                          <div
                            className={styles.phone_show}
                            onClick={() => handleShowPhoneNumberClick(contact.id)}
                            title={t("model.show_the_number")}
                          >
                            [{t("global.show")}]
                          </div>
                        </div>
                      )}
                      <div className={styles.messengers}>
                        {contact.is_telegram_enable ? (
                          <a
                            href={`https://t.me/+${changePhoneNumber(contact.phone_number)}`}
                            target="_blank"
                            title={t("model.write_to_telegram")}
                          >
                            <TelegramIcon isGray={false} />
                          </a>
                        ) : null}
                        {contact.is_whatsapp_enable ? (
                          <a
                            href={`https://api.whatsapp.com/send/?phone=${changePhoneNumber(contact.phone_number)}`}
                            target="_blank"
                            title={t("model.write_to_whatsapp")}
                          >
                            <WhatsappIcon isGray={false} />
                          </a>
                        ) : null}
                        {contact.is_wechat_enable ? (
                          <div title={t("model.has_a_wechat")}>
                            <WechatIcon isGray={false} />
                          </div>
                        ) : null}
                        {contact.is_botim_enable ? (
                          <div title={t("model.has_a_botim")}>
                            <BotimIcon isGray={false} />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  <div className={styles.parameters}>
                    <div className={styles.parameter}>
                      {t("global.country")}:
                      <div className={styles.value}>
                        {model.country_id === -1
                          ? t("global.not_specified")
                          : i18n.resolvedLanguage === "ru"
                          ? countries.find((country: ICountry) => country.id === model.country_id)?.country
                          : countries.find((country: ICountry) => country.id === model.country_id)?.country_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.city")}:
                      <div className={styles.value}>
                        {model.city_id === -1
                          ? t("global.not_specified_m")
                          : i18n.resolvedLanguage === "ru"
                          ? cities.find((city: ICity) => city.id === model.city_id)?.city
                          : cities.find((city: ICity) => city.id === model.city_id)?.city_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.district")}:
                      <div className={styles.value}>
                        {model.district_id === -1
                          ? t("global.not_specified_m")
                          : i18n.resolvedLanguage === "ru"
                          ? districts.find((district: IDistrict) => district.id === model.district_id)?.district
                          : districts.find((district: IDistrict) => district.id === model.district_id)?.district_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("global.underground")}:
                      <div className={styles.value}>
                        {model.underground_id === -1
                          ? t("global.not_specified_s")
                          : i18n.resolvedLanguage === "ru"
                          ? undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)
                              ?.underground
                          : undergrounds.find((underground: IUnderground) => underground.id === model.underground_id)
                              ?.underground_eng}
                      </div>
                    </div>
                    {model.meeting_id !== -1 && (
                      <div className={styles.parameter}>
                        {t("model.meeting_with")}:
                        <div className={styles.value}>
                          {i18n.resolvedLanguage === "ru"
                            ? meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting
                            : meetings.find((meeting: IMeeting) => meeting.id === model.meeting_id)?.meeting_eng}
                        </div>
                      </div>
                    )}
                    <div className={styles.parameter}>
                      {t("model.age")}:<div className={styles.value}>{model.age}</div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.weight")}:
                      <div className={styles.value}>
                        {model.weight} {t("model.kg")}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.height")}:
                      <div className={styles.value}>
                        {model.height} {t("model.cm")}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.model_type")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? modelTypes.find((modelType: IModelType) => modelType.id === model.type_id)?.type
                          : modelTypes.find((modelType: IModelType) => modelType.id === model.type_id)?.type_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.orientation")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)
                              ?.orientation
                          : orientations.find((orientation: IOrientation) => orientation.id === model.orientation_id)
                              ?.orientation_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.breast")}:
                      <div className={styles.value}>
                        {`${
                          breastSizes.find((breasSize: IBreastSize) => breasSize.id === model.breast_size_id)?.breast_size
                        } ${
                          i18n.resolvedLanguage === "ru"
                            ? breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)
                                ?.breast_type
                            : breastTypes.find((breastType: IBreastType) => breastType.id === model.breast_type_id)
                                ?.breast_type_eng
                        }`}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.hair_color")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color
                          : hairColors.find((hairColor: IHairColor) => hairColor.id === model.hair_color_id)?.hair_color_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.hair_size")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size
                          : hairSizes.find((hairSize: IHairSize) => hairSize.id === model.hair_size_id)?.hair_size_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.ethnic_group")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)
                              ?.ethnic_group
                          : ethnicGroups.find((ethnicGroup: IEthnicGroup) => ethnicGroup.id === model.ethnic_group_id)
                              ?.ethnic_group_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.nationality")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)
                              ?.nationality
                          : nationalities.find((nationality: INationality) => nationality.id === model.nationality_id)
                              ?.nationality_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.language")}:
                      {model.model_languages.length === 0 ? (
                        <div className={styles.value}>{t("global.not_specified_m")}</div>
                      ) : (
                        <div className={styles.value}>
                          {
                            model.model_languages.filter((modelLanguage: IModelLanguage) => 
                                languages.find((language: ILanguage) => language.id === modelLanguage.language_id)
                                  ?.[i18n.resolvedLanguage === "ru" ? "language" : "language_eng"]
                            ).map(
                              (modelLanguage: IModelLanguage, index: number) => 
                                `${index ? " | " : ""} ${languages.find((language: ILanguage) => language.id === modelLanguage.language_id)
                                  ?.[i18n.resolvedLanguage === "ru" ? "language" : "language_eng"]}`
                            )
                          }
                        </div>
                      )}
                    </div>
                    <div className={styles.parameter}>
                      {t("model.trips")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip
                          : trips.find((trip: ITrip) => trip.id === model.trip_id)?.trip_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.tattoo")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo
                          : tatoos.find((tatoo: ITatoo) => tatoo.id === model.tatoo_id)?.tatoo_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.piercing")}:
                      <div className={styles.value}>
                        {model.model_piercings.map(
                          (modelPiercing: IModelPiercing, index: number) =>
                            `${index ? " | " : ""} ${
                              i18n.resolvedLanguage === "ru"
                                ? piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                    ?.piercing
                                : piercings.find((piercing: IPiercing) => piercing.id === modelPiercing.piercing_id)
                                    ?.piercing_eng
                            }`
                        )}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.smoker")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker
                          : smookers.find((smooker: ISmooker) => smooker.id === model.smooker_id)?.smooker_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.eyes_color")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color
                          : eyesColors.find((eyesColor: IEyesColor) => eyesColor.id === model.eyes_color_id)?.eyes_color_eng}
                      </div>
                    </div>
                    <div className={styles.parameter}>
                      {t("model.pubic_hair")}:
                      <div className={styles.value}>
                        {i18n.resolvedLanguage === "ru"
                          ? pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair
                          : pubisHairs.find((pubisHair: IPubisHair) => pubisHair.id === model.pubis_hair_id)?.pubis_hair_eng}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.parts}>
              <div className={styles.part}>
                {t("model.working_hours")}
                <table className={globalStyles.table}>
                  <tr className={globalStyles.borderer}>
                    <th style={{ width: "50%" }}>{t("model.day_of_the_week")}</th>
                    <th style={{ width: "25%" }} className={globalStyles.borderer}>
                      {t("global.from")}
                    </th>
                    <th style={{ width: "25%" }} className={globalStyles.borderer}>
                      {t("global.before")}
                    </th>
                  </tr>
                  {modelWorkTimes.map((workTime: IWorkTime) => (
                    <tr>
                      <td style={{ width: "50%" }}>
                        {i18n.resolvedLanguage === "ru"
                          ? daysOfWeek.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)?.day_of_week
                          : daysOfWeek.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)
                              ?.day_of_week_eng}
                      </td>
                      {workTime.time_end === "" && workTime.time_start === "" && workTime.is_all_day === false && (
                        <td
                          style={{ width: "calc(50% + 16.5px)", textAlign: "center" }}
                          colSpan={2}
                          className={globalStyles.borderer}
                        >
                          <CloseIcon fill="#98042D" />
                        </td>
                      )}
                      {workTime.is_all_day ? (
                        <td
                          style={{ width: "calc(50% + 16.5px)", textAlign: "center" }}
                          colSpan={2}
                          className={globalStyles.borderer}
                        >
                          {t("model.all_day")}
                        </td>
                      ) : null}
                      {(workTime.time_end !== "" || workTime.time_start !== "") && (
                        <td style={{ width: "25%", textAlign: "center" }} className={globalStyles.borderer}>
                          {workTime.time_start}
                        </td>
                      )}
                      {(workTime.time_end !== "" || workTime.time_start !== "") && (
                        <td style={{ width: "25%", textAlign: "center" }} className={globalStyles.borderer}>
                          {workTime.time_end}
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
              </div>
              <div className={styles.part}>
                {t("model.tariffs")}
                <table className={globalStyles.table}>
                  <tr className={globalStyles.borderer}>
                    <th style={{ width: "30%" }} />
                    {meetingPlaces
                      .filter(
                        (meetingPlace: IMeetingPlace) =>
                          meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                      )
                      .map((meetingPlace: IMeetingPlace) => (
                        <th style={{ width: "35%" }} className={globalStyles.borderer}>
                          {i18n.resolvedLanguage === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                        </th>
                      ))}
                  </tr>
                  {workDurations.map((workDuration: IWorkDuration) => (
                    <tr>
                      <td style={{ width: "30%" }}>
                        {i18n.resolvedLanguage === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                      </td>
                      {meetingPlaces
                        .filter(
                          (meetingPlace: IMeetingPlace) =>
                            meetingPlace.meeting_place === "Аппартаменты" || meetingPlace.meeting_place === "Выезд"
                        )
                        .map((meetingPlace: IMeetingPlace) => (
                          <td style={{ width: "35%", textAlign: "center" }} className={globalStyles.borderer}>
                            {modelTarifs.find(
                              (tarif: ITarif) =>
                                tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                            )?.price === undefined ||
                            modelTarifs.find(
                              (tarif: ITarif) =>
                                tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                            )?.price === 0 ? (
                              <CloseIcon fill="#98042D" />
                            ) : (
                              modelTarifs.find(
                                (tarif: ITarif) =>
                                  tarif.work_duration_id === workDuration.id && tarif.meeting_place_id === meetingPlace.id
                              )?.price +
                              " " +
                              currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol
                            )}
                          </td>
                        ))}
                    </tr>
                  ))}
                </table>
              </div>
            </div>
            <div className={styles.services}>
              {t("model.services")}
              <div className={styles.services_wrapper}>
                {serviceCategories.map((serviceCategory: IServiceCategory) => (
                  <div className={styles.services_group}>
                    <div className={styles.group_name}>
                      {i18n.resolvedLanguage === "ru"
                        ? serviceCategory.service_category
                        : serviceCategory.service_category_eng}
                    </div>
                    <div className={styles.services_list}>
                      {modelServices
                        .filter((modelService: IModelService) => modelService.category_id === serviceCategory.id)
                        .map((modelService: IModelService) => (
                          <div className={styles.service}>
                            {modelService.price > -1 ? <CheckIcon fill="#98042D" /> : <CloseIcon fill="#8B8B8B" />}
                            <div className={styles.service_item + " " + (modelService.price === -1 && styles.disabled)}>
                              {i18n.resolvedLanguage === "ru"
                                ? serviceCategory.services.find(
                                    (service: IService) => service.id === modelService.service_id
                                  )?.service
                                : serviceCategory.services.find(
                                    (service: IService) => service.id === modelService.service_id
                                  )?.service_eng}
                            </div>
                            {modelService.price === 0 && <div className={styles.avaliable}>{t("model.avaliable")}</div>}
                            {modelService.price > 0 && (
                              <div className={styles.for_money}>
                                +{modelService.price}{" "}
                                {currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <FeedbacksContent model={model} />
          </div>
          {forModerator ? <div className={styles.moderator_control}>
            <div className={styles.toggle_wrapper}>
              <div
                className={`${styles.toggle} ${!!isModelEnable ? styles.active : ""}`}
                onClick={() => setIsModelEnable(true)}
              >
                Включить
              </div>
              <div
                className={`${styles.toggle} ${!isModelEnable ? styles.active : ""}`}
                onClick={() => setIsModelEnable(false)}
              >
                Выключить
              </div>
            </div>
          </div> : null}
        </div>
      )}
    </>
  );
};

export default Model;
