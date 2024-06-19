import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import globalStyles from "../../../App.module.sass";
import pageStyles from "../ModelSettings.module.sass";
import styles from "./Tarifs.module.sass";

import MessageModal from "../../../components/Modals/MessageModal";

import { ComponentType } from "./ComponentType";
import CurrenciesSelector from "./selectors/CurrenciesSelector";
import TimeSelector from "./selectors/TimeSelector";

import { IWorkDuration } from "../../../types/core/workDuration";
import { IMeetingPlace } from "../../../types/core/meetingPlace";
import { ICurrency } from "../../../types/core/currency";
import { ITarif } from "../../../types/model/tarif/tarif";
import { IWorkTime } from "../../../types/model/workTime/workTime";
import { IDayOfWeek } from "../../../types/core/dayOfWeek";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";

import { Check as CheckIcon } from "../../../assets/Check";

const Tarifs = () => {
  const { t, i18n } = useTranslation();
  const {
    setModel,
    updateModelCurrencyTimezone,
    getModels,
    addTarifs,
    addWorkTimes,
    setModelStatuses,
    setTarifStatus,
    setWorkTimeStatus,
  } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const modelStatuses = useTypedSelector((state) => state.modelReducer.serverStatuses);
  const tarifStatus = useTypedSelector((state) => state.tarifReducer.serverStatus);
  const workTimeStatus = useTypedSelector((state) => state.workTimeReducer.serverStatus);
  const meetingPlaces = useTypedSelector((state) => state.coreReducer.meetingPlaces);
  const currencies = useTypedSelector((state) => state.coreReducer.currencies);
  const workDurations = useTypedSelector((state) => state.coreReducer.workDurations);
  const daysOfWeek = useTypedSelector((state) => state.coreReducer.daysOfWeek);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [modelTarifs, setModelTarifs] = useState([] as ITarif[]);
  const [modelWorkTimes, setModelWorkTimes] = useState([] as IWorkTime[]);
  const [activeTimeSelector, setActiveTimeSelector] = useState(-1);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.tariffs")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.tariffs")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    const meetingPlace = meetingPlaces.find((meetingPlace: IMeetingPlace) => meetingPlace.id === model.meeting_place_id);
    var tmpTarifs = [] as ITarif[];
    if (meetingPlaces.length > 0 && workDurations.length > 0 && model.id > 0)
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
  }, [model.tarifs]);

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
              } as IWorkTime)
        );
      });
    }
    setModelWorkTimes(tmpWorkTimes);
  }, [model.work_times]);

  const handleChangeTariff = (event, tariff: ITarif) => {
    const tmpTarifs = modelTarifs.map((tmpTariff: ITarif) => {
      if (tariff.id === tmpTariff.id) {
        return {
          ...tmpTariff,
          price:
            Number.isNaN(Number(event.target.value)) || Number(event.target.value) < 0
              ? tmpTariff.price
              : Number(event.target.value),
        };
      } else return tmpTariff;
    });
    setModelTarifs(tmpTarifs);
    setModel({ ...model, tarifs: tmpTarifs.filter((tariff: ITarif) => tariff.price > 0) });
  };

  const handleChangeWorkTime = (workTime: IWorkTime) => {
    const tmpWorkTimes = modelWorkTimes.map((tmpWorkTime: IWorkTime) => {
      if (tmpWorkTime.id === workTime.id) {
        return {
          ...tmpWorkTime,
          time_start: workTime.time_start,
          time_end: workTime.time_end,
          is_all_day: workTime.is_all_day ? true : false,
        } as IWorkTime;
      } else return tmpWorkTime;
    });
    setModelWorkTimes(tmpWorkTimes);
    setModel({
      ...model,
      work_times: tmpWorkTimes,
    });
  };

  useEffect(() => {
    if (modelStatuses.updateModelCurrencyTimezone.status === ServerStatusType.Success) {
      addTarifs({ model_id: model.id, tarifs: model.tarifs });
      addWorkTimes({
        model_id: model.id,
        work_times: model.work_times.filter(
          (workTime: IWorkTime) => (workTime.time_end !== "" && workTime.time_start !== "") || workTime.is_all_day
        ),
      });
      setModelStatuses({ ...modelStatuses, updateModelCurrencyTimezone: initServerStatus() });
    }
  }, [modelStatuses]);

  useEffect(() => {
    if (tarifStatus.status === ServerStatusType.Success && workTimeStatus.status === ServerStatusType.Success) {
      setInfoMessage(t("global.data_successfully_updated"));
      setTarifStatus(initServerStatus());
      setWorkTimeStatus(initServerStatus());
      setIsMessageModalShow(true);
      window.scrollTo({ top: 0 });
      getModels({ profile_id: profile.id });
    }
    if (tarifStatus.status === ServerStatusType.Error || workTimeStatus.status === ServerStatusType.Error) {
      setInfoMessage(tarifStatus.error !== "" ? tarifStatus.error : workTimeStatus.error);
      setTarifStatus(initServerStatus());
      setWorkTimeStatus(initServerStatus());
      setIsMessageModalShow(true);
      window.scrollTo({ top: 0 });
      getModels({ profile_id: profile.id });
    }
  }, [tarifStatus, workTimeStatus]);

  return (
    <div className={pageStyles.content}>
      <div className={pageStyles.content}>
        <div className={pageStyles.title}>{t("model.tariffs")}</div>
        <div className={styles.tarifs_container}>
          <div className={styles.item}>
            <CurrenciesSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              setActiveTimeSelector={setActiveTimeSelector}
            />
          </div>
          <div className={`${styles.item} ${windowSize.innerWidth > 1500 ? styles.full_width : ""}`}>
            {windowSize.innerWidth > 1500 ? (
              <table>
                <tr className={styles.header}>
                  <td className={styles.row_header} />
                  {workDurations.map((workDuration: IWorkDuration) => (
                    <td className={styles.column_header}>
                      {i18n.resolvedLanguage === "ru" ? workDuration.work_duration : workDuration.work_duration_eng}
                    </td>
                  ))}
                  <td className={styles.currency} />
                </tr>
                {meetingPlaces.map(
                  (meetingPlace: IMeetingPlace) =>
                    modelTarifs.filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id).length > 0 && (
                      <tr>
                        <td className={styles.row_header}>
                          {i18n.resolvedLanguage === "ru" ? meetingPlace.meeting_place : meetingPlace.meeting_place_eng}
                        </td>
                        {modelTarifs
                          .filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id)
                          .map((tariff: ITarif) => (
                            <td>
                              <input
                                type="text"
                                placeholder=""
                                value={tariff.price > 0 ? tariff.price : ""}
                                onClick={() => setActiveComponent(ComponentType.None)}
                                onChange={(event) => handleChangeTariff(event, tariff)}
                              />
                            </td>
                          ))}
                        <td className={styles.currency}>
                          {currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                        </td>
                      </tr>
                    )
                )}
              </table>
            ) : (
              <table>
                <tr className={styles.header}>
                  <td className={styles.row_header} />
                  {meetingPlaces.map(
                    (meetingPlace: IMeetingPlace) =>
                      modelTarifs.filter((tarif: ITarif) => tarif.meeting_place_id === meetingPlace.id).length > 0 && (
                        <td className={styles.column_header}>{meetingPlace.meeting_place}</td>
                      )
                  )}
                  <td className={styles.currency} />
                </tr>
                {workDurations.map((workDuration: IWorkDuration) => (
                  <tr>
                    <td className={styles.row_header}>{workDuration.work_duration}</td>
                    {meetingPlaces.map(
                      (meetingPlace: IMeetingPlace) =>
                        modelTarifs.filter(
                          (tarif: ITarif) =>
                            tarif.meeting_place_id === meetingPlace.id && tarif.work_duration_id === workDuration.id
                        ).length > 0 && (
                          <td>
                            <input
                              type="text"
                              placeholder=""
                              value={
                                modelTarifs.find(
                                  (tarif: ITarif) =>
                                    tarif.meeting_place_id === meetingPlace.id && tarif.work_duration_id === workDuration.id
                                )!.price > 0
                                  ? modelTarifs.find(
                                      (tarif: ITarif) =>
                                        tarif.meeting_place_id === meetingPlace.id &&
                                        tarif.work_duration_id === workDuration.id
                                    )!.price
                                  : ""
                              }
                              onClick={() => setActiveComponent(ComponentType.None)}
                              onChange={(event) =>
                                handleChangeTariff(
                                  event,
                                  modelTarifs.find(
                                    (tarif: ITarif) =>
                                      tarif.meeting_place_id === meetingPlace.id &&
                                      tarif.work_duration_id === workDuration.id
                                  )!
                                )
                              }
                            />
                          </td>
                        )
                    )}
                    <td className={styles.currency}>
                      {currencies.find((currency: ICurrency) => currency.id === model.currency_id)?.symbol}
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </div>
        </div>
      </div>
      <div className={pageStyles.content}>
        <div className={pageStyles.title}>{t("model.working_hours")}</div>
        <div className={styles.tarifs_container}>
          {/*<div className={styles.item}>
            <TimezonesSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              setActiveTimeSelector={setActiveTimeSelector}
            />
          </div>*/}
          <div className={`${styles.item} ${styles.full_width}`}>
            <table className={styles.work_times}>
              <tr className={styles.header}>
                <td className={styles.row_header} />
                <td className={styles.column_header}>{t("global.from")}</td>
                <td className={styles.column_header}>{t("global.before")}</td>
                <td className={styles.all_day}>{t("model.all_day")}</td>
              </tr>
              {modelWorkTimes.map((workTime: IWorkTime, index: number) => (
                <tr>
                  <td className={styles.row_header}>
                    {i18n.resolvedLanguage === "ru"
                      ? daysOfWeek.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)?.day_of_week
                      : daysOfWeek.find((dayOfWeek: IDayOfWeek) => dayOfWeek.id === workTime.day_of_week_id)
                          ?.day_of_week_eng}
                  </td>
                  <td>
                    {!workTime.is_all_day && (
                      <div className={styles.time_selector_container}>
                        <TimeSelector
                          setActiveComponent={setActiveComponent}
                          selectorId={(index + 1) * 2}
                          activeTimeSelector={activeTimeSelector}
                          setActiveTimeSelector={setActiveTimeSelector}
                          workTime={workTime}
                          onSelect={handleChangeWorkTime}
                        />
                      </div>
                    )}
                  </td>
                  <td>
                    {!workTime.is_all_day && (
                      <div className={styles.time_selector_container}>
                        <TimeSelector
                          setActiveComponent={setActiveComponent}
                          selectorId={(index + 1) * 2 + 1}
                          activeTimeSelector={activeTimeSelector}
                          setActiveTimeSelector={setActiveTimeSelector}
                          workTime={workTime}
                          onSelect={handleChangeWorkTime}
                        />
                      </div>
                    )}
                  </td>
                  <td className={`${styles.all_day} ${styles.checkbox}`}>
                    <label className={`${globalStyles.checkbox} ${globalStyles.empty}`}>
                      <input type="checkbox" />
                      <span
                        className={`${globalStyles.checkbox_mark} ${globalStyles.white} ${
                          workTime.is_all_day ? globalStyles.active : ""
                        }`}
                        aria-hidden="true"
                        onClick={() =>
                          handleChangeWorkTime({
                            ...workTime,
                            is_all_day: !workTime.is_all_day,
                            time_start: "",
                            time_end: "",
                          })
                        }
                      >
                        {workTime.is_all_day ? <CheckIcon fill="#98042D" /> : ""}
                      </span>
                    </label>
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
        <button
          type="button"
          onClick={() =>
            updateModelCurrencyTimezone({ model_id: model.id, currency_id: model.currency_id, time_zone: model.time_zone })
          }
        >
          {t("global.save")}
        </button>
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Tarifs;
