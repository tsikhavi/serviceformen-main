/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import ContactsSelector from "./selectors/ContactsSelector";
import DistrictSelector from "./selectors/DistrictSelector";
import UndergroundSelector from "./selectors/UndergroundSelector";
import ModelTypeSelector from "./selectors/ModelTypeSelector";
import OrientationSelector from "./selectors/OrientationSelector";
import MeetingSelector from "./selectors/MeetingSelector";
import AgeSelector from "./selectors/AgeSelector";
import HeightSelector from "./selectors/HeightSelector";
import WeightSelector from "./selectors/WeightSelector";
import EthnicGroupSelector from "./selectors/EthnicGroupSelector";
import HairColorSelector from "./selectors/HairColorSelector";
import HairSizeSelector from "./selectors/HairSizeSelector";
import BreastSizeSelector from "./selectors/BreastSizeSelector";
import BreastTypeSelector from "./selectors/BreastTypeSelector";
import NationalitySelector from "./selectors/NationalitySelector";
import MeetingPlaceSelector from "./selectors/MeetingPlaceSelector";
import TripSelector from "./selectors/TripSelector";
import LanguagesSelector from "./selectors/LanguagesSelector";
import TatooSelector from "./selectors/TatooSelector";
import PiercingsSelector from "./selectors/PiercingsSelector";
import SmookerSelector from "./selectors/SmookerSelector";
import EyesColorSelector from "./selectors/EyesColorSelector";
import PubisHairSelector from "./selectors/PubisHairSelector";
import PornstarSelector from "./selectors/PornstarSelector";
import BlockedCountriesSelector from "./selectors/BlockedCountriesSelector";
import ProposalPlacesSelector from "./selectors/ProposalPlacesSelector";

import globalStyles from "../../../App.module.sass";
import pageStyles from "../ModelSettings.module.sass";
import styles from "./Parameters.module.sass";

import MessageModal from "../../../components/Modals/MessageModal";

import { ComponentType } from "./ComponentType";
import { IContact } from "../../../types/model/contact/contact";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";

interface IParametersParams {
  isNew: boolean;
}

const Parameters: React.FC<IParametersParams> = ({ isNew }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setModel, addModel, updateModel, getModels, setModelStatuses, setActiveModelSettingsSection, authMe } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const model = useTypedSelector((state) => state.modelReducer.model);
  const modelStatuses = useTypedSelector((state) => state.modelReducer.serverStatuses);
  const modelTypes = useTypedSelector((state) => state.coreReducer.modelTypes);
  const [activeComponent, setActiveComponent] = useState(ComponentType.None);
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isCheckStart, setIsCheckStart] = useState(false);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.basic_parameters")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.basic_parameters")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (
      modelStatuses.addModel.status === ServerStatusType.Success ||
      modelStatuses.updateModel.status === ServerStatusType.Success
    ) {
      setModelStatuses({ ...modelStatuses, addModel: initServerStatus(), updateModel: initServerStatus() });
      getModels({ profile_id: profile.id });
      setActiveModelSettingsSection(1);
      window.scrollTo({ top: 0 });
      navigate("/model_settings/" + String(model.id).padStart(8, "0"));
    }
    if (
      modelStatuses.addModel.status === ServerStatusType.Error ||
      modelStatuses.updateModel.status === ServerStatusType.Error
    ) {
      setInfoMessage(
        t(modelStatuses.addModel.error !== "" ? modelStatuses.addModel.error : modelStatuses.updateModel.error)
      );
      setModelStatuses({ ...modelStatuses, addModel: initServerStatus(), updateModel: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [modelStatuses]);

  useEffect(() => {
    setIsSaveEnabled(
      model.name !== "" &&
        model.country_id > -1 &&
        model.city_id > -1 &&
        model.contacts.filter((contact: IContact) => contact.phone_number.length < 18).length === 0 &&
        model.orientation_id > -1 &&
        model.age > 17 &&
        model.height > 149 &&
        model.weight > 39 &&
        model.ethnic_group_id > -1 &&
        model.hair_color_id > -1 &&
        model.hair_size_id > -1 &&
        model.breast_size_id > -1 &&
        model.breast_type_id > -1 &&
        model.meeting_place_id > -1 &&
        model.nationality_id > -1 &&
        model.trip_id > -1 &&
        model.tatoo_id > -1 &&
        model.model_piercings.length > 0 &&
        model.smooker_id > -1 &&
        model.eyes_color_id > -1 &&
        model.pubis_hair_id > -1 &&
        model.is_pornstar > -1
    );
  }, [model]);

  useEffect(() => {
    if (model.type_id === -1) {
      setModel({ ...model, type_id: modelTypes.length > 0 ? modelTypes[0].id : -1 });
    }
  }, [modelTypes, model]);

  /*useEffect(() => {
    setModel({ ...model, city_id: -1 });
  }, [model.country_id]);

  useEffect(() => {
    setModel({ ...model, district_id: -1, underground_id: -1 });
  }, [model.city_id]);*/

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveComponent(ComponentType.None);
    if (isSaveEnabled) {
      if (isNew) {
        setModel({ ...model, agency_id: profile.id });
        if (model.id > 0) {
          updateModel({ model });
        } else {
          addModel({ model: { ...model, agency_id: profile.id } });
          authMe();
        }
      } else {
        if (model.id > 0) {
          updateModel({ model });
        }
      }
    } else {
      if (!isCheckStart) {
        setIsCheckStart(true);
      } else {
        var wrongs = document.getElementsByClassName("wrong");
        if (wrongs.length > 0) {
          console.log(wrongs.length);
          window.scrollTo({ top: (wrongs[0] as HTMLElement).offsetTop - 50, behavior: "smooth" });
          setInfoMessage(t("model.fill_fields"));
          setIsMessageModalShow(true);
        }
      }
    }
  };

  useEffect(() => {
    if (isCheckStart) {
      var wrongs = document.getElementsByClassName("wrong");
      if (wrongs.length > 0) {
        window.scrollTo({ top: (wrongs[0] as HTMLElement).offsetTop - 50, behavior: "smooth" });
        setInfoMessage(t("model.fill_fields"));
        setIsMessageModalShow(true);
      }
    }
  }, [isCheckStart]);

  return (
    <div className={pageStyles.content}>
      <div className={pageStyles.title}>
        {model.id < 0 ? t("global.add") : t("global.edit")} {t("model.advertisement_edit")}
      </div>
      <div className={styles.parameters}>
        {model.id > 0 ? (
          <div className={styles.main_parameter}>
            <div className={styles.item}>
              <div className={styles.label}>{t("model.advertisement_id")}</div>
              <div className={styles.value}>{String(model.id).padStart(8, "0")}</div>
            </div>
          </div>
        ) : null}
        <form className={styles.parameters} onSubmit={handleSubmit}>
          <div className={`${isCheckStart && model.name.trim() === "" ? "wrong" : ""} ${styles.main_parameter}`}>
            <div className={styles.input_field}>
              <div className={styles.label}>{t("global.name")}</div>
              <input
                className={isCheckStart && model.name.trim() === "" ? `${globalStyles.wrong}` : ""}
                placeholder=""
                type="name"
                onChange={(event) => setModel({ ...model, name: event.target.value })}
                value={model.name}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
              <div className={globalStyles.required}>*</div>
            </div>
          </div>
          <div className={styles.main_parameter}>
            <div className={styles.textarea_field}>
              <div className={styles.label}>{t("model.about_me")}</div>
              <textarea
                placeholder=""
                onChange={(event) => setModel({ ...model, about_self: event.target.value })}
                value={model.about_self}
                onClick={() => setActiveComponent(ComponentType.None)}
              />
            </div>
          </div>
          <ContactsSelector setActiveComponent={setActiveComponent} isCheckStart={isCheckStart} />
          {/*<div className={styles.item}>
            <CountrySelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.item}>
            <CitySelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>*/}
          <div className={styles.item}>
            <DistrictSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.item}>
            <UndergroundSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <ModelTypeSelector setActiveComponent={setActiveComponent} />
          <div className={styles.item}>
            <OrientationSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <MeetingSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.item}>
            <AgeSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <HeightSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <WeightSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <EthnicGroupSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <HairColorSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <HairSizeSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <BreastSizeSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <BreastTypeSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <MeetingPlaceSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <ProposalPlacesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.item}>
            <NationalitySelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <TripSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <LanguagesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.item}>
            <TatooSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <PiercingsSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <SmookerSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <EyesColorSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <PubisHairSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <PornstarSelector
              activeComponent={activeComponent}
              setActiveComponent={setActiveComponent}
              isCheckStart={isCheckStart}
            />
          </div>
          <div className={styles.item}>
            <BlockedCountriesSelector activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
          </div>
          <div className={styles.main_parameter}>
            <button type="submit">{t("global.save")}</button>
          </div>
        </form>
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

export default Parameters;
