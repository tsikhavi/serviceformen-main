/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import ModelSettingsNavigation from "./modelSettingsNavigation/ModelSettingsNavigation";

import styles from "./ModelSettings.module.sass";

import Parameters from "./parameters/Parameters";
import Photos from "./photos/Photos";
import Videos from "./videos/Videos";
import Tarifs from "./tarifs/Tarifs";
import Services from "./services/Services";
import Statistics from "./statistics/Statistics";
import Feedbacks from "./feedbacks/Feedbacks";
import Orders from "./orders/Orders";

import { ServerStatusType } from "../../enums/serverStatusType";
import { IModel } from "../../types/model/model/model";
import { initModel } from "../../types/model/model/initModel";
import { ILanguage } from "src/types/model/language/language";
import { IModelLanguage } from "src/types/model/language/modelLanguage";
import ProfileNavigation from "../Profile/content/profileNavigation/ProfileNavigation";

const ModelSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setActiveHeaderLink, setModel, getProposals, getProposalViews, getlanguages } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const models = useTypedSelector((state) => state.modelReducer.models);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const activeSection = useTypedSelector((state) => state.modelReducer.activeModelSettingsSection);
  const languages = useTypedSelector((state) => state.coreReducer.languages);

  const modelSettingsSections = [
    <Parameters isNew={id === "new"} />,
    <Photos />,
    <Videos />,
    <Tarifs />,
    <Services />,
    <Statistics />,
    <Feedbacks />,
    <Orders />,
  ] as JSX.Element[];

  useEffect(() => {
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    setActiveHeaderLink(-1);
  }, [activeSection]);

  useEffect(() => {
    if (!isAuth && profileStatuses.authMe.status === ServerStatusType.Error) {
      navigate("/");
    } else {
      getlanguages();
      getProposals();
      getProposalViews();
    }
  }, [isAuth]);

  useEffect(() => {
    if (id !== "new") {
      if (models.filter((model: IModel) => model.id === Number(id)).length > 0) {
        if (models.find((model: IModel) => model.id === Number(id))!.agency_id !== profile.id) {
          navigate("/");
        } else {
          setModel(models.find((model: IModel) => model.id === Number(id))!);
        }
      }
    } else {
      if (Array.isArray(languages) && languages.length > 0) {
        setModel({
          ...initModel(),
          agency_id: profile.id,
          model_languages: [
            {
              id: -1,
              model_id: -1,
              language_id: languages.find((language: ILanguage) => language.language === "Русский")!.id,
            } as IModelLanguage,
          ],
        });
      }
    }
  }, [id, models, languages]);

  return (
    <div className={styles.wrapper_content}>
      <ProfileNavigation />
      <ModelSettingsNavigation />
      {modelSettingsSections[activeSection]}
    </div>
  );
};

export default ModelSettings;
