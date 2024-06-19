/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useActions } from "../../../../hooks/useActions";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "../../Profile.module.sass";

import ProfileModel from "../../../../components/ProfileModel/ProfileModel";

import { IModel } from "../../../../types/model/model/model";

import { Search as SearchIcon } from "../../../../assets/Search";

const Models = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { getPositionsUp } = useActions();
  const positionsUpData = useTypedSelector((state) => state.verificationReducer.positionsUpData);
  const models = useTypedSelector((state) => state.modelReducer.models);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const [searchedModels, setSearchedModels] = useState(models.filter((model: IModel) => model.agency_id === profile.id));
  const [searchedName, setSearchedName] = useState("");

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("global.advertisements")}`;
  }, []);

  useEffect(() => {
    if (profile && profile.id) {
      getPositionsUp({ agency_id: profile.id } as any)
    }
  }, [profile]);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("global.advertisements")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    let modelsTemp: IModel[] = []
    if (searchedName.trim() != "") {
      const value = searchedName.trim().toLowerCase();
      modelsTemp = models.filter(
          (model: IModel) =>
            model.agency_id === profile.id &&
            (model.name.toLowerCase().startsWith(value) || String(model.id).padStart(8, "0").startsWith(value))
        );
    } else {
      modelsTemp = models.filter((model: IModel) => model.agency_id === profile.id);
    }

    if (models && positionsUpData && positionsUpData.length > 0) {
      modelsTemp = modelsTemp.map(m => {
        const positionUp = positionsUpData.find((p) => m.id === p.model_id)
        let positionsUpLeft = 6
        if (positionUp && positionUp.last_try) {
          const dateNow = new Date().toISOString().substring(0, 13)
          const dateLastPositionUp = new Date(positionUp.last_try).toISOString().substring(0, 13)
          if (dateNow === dateLastPositionUp) {
            positionsUpLeft = positionUp.attempts_number
          }
        }
        return { ...m, positionsUpLeft }
      })
    }

    setSearchedModels(modelsTemp);
  }, [models, searchedName, positionsUpData]);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("global.advertisements")}</div>
      <div className={`${styles.main_info} ${styles.full_width}`}>
        <div className={styles.search}>
          <input placeholder={t("profile.search_by_name")} onChange={(event) => setSearchedName(event.target.value)} />
          <div className={styles.search_icon}>
            <SearchIcon fill="#98042D" />
          </div>
        </div>
      </div>
      <div className={styles.models_wrapper}>
        {searchedModels.map((model: IModel) => (
          <ProfileModel model={model} />
        ))}
      </div>
      <button type="button" onClick={() => navigate("/model_settings/new")}>
        {t("profile.add_advertisement")}
      </button>
    </div>
  );
};

export default Models;
