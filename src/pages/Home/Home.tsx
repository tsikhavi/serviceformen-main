import { useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from 'react-helmet-async';


import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import Filters from "./filters/Filters";
import Models from "./models/Models";

import styles from "./Home.module.sass";

import { HomePageType } from "../../enums/homePageType";
import { VideoStatus } from "../../enums/videoStatus";

import { IModel } from "../../types/model/model/model";
import { IVideo } from "../../types/model/video/video";
import { initFilter } from "../../types/model/filter/initFilter";
import React from "react";


interface IHomeProps {
  type: HomePageType;
  forModerator?: boolean;
}

const googleAnalyticsId = process.env.REACT_APP_GA_ID;

if (!googleAnalyticsId) {
  throw new Error("REACT_APP_GA_ID is not defined");
}


const Home: React.FC<IHomeProps> = ({ type, forModerator = false }) => {
  const { t, i18n } = useTranslation();
  const { setFilter, setFilteredModels, setActiveHeaderLink } = useActions();
  const models = useTypedSelector((state) => state.modelReducer.models);
  const [isFiltersActive, setIsFiltersActive] = useState(false);

  useEffect(() => {
    setFilter(initFilter());
    setIsFiltersActive(false);
  }, []);

  useLayoutEffect(() => {
    switch (type) {
      case HomePageType.AllModels:
        document.title = `${t("navigation.home")} | ${t("navigation.all_models")}`;
        if (Array.isArray(models) && models.length > 0) {
          setFilteredModels(models.filter((model: IModel) => model.is_enable));
        }
        setActiveHeaderLink(0);
        break;
      case HomePageType.New:
        document.title = `${t("navigation.home")} | ${t("navigation.new")}`;
        if (Array.isArray(models) && models.length > 0) {
          setFilteredModels(models.filter((model: IModel) => model.is_enable && calcIsNew(model.create_date)));
        }
        setActiveHeaderLink(1);
        break;
      case HomePageType.Verified:
        document.title = `${t("navigation.home")} | ${t("navigation.verified")}`;
        if (Array.isArray(models) && models.length > 0) {
          setFilteredModels(models.filter((model: IModel) => model.is_enable && model.is_verified));
        }
        setActiveHeaderLink(2);
        break;
      case HomePageType.WithVideo:
        document.title = `${t("navigation.home")} | ${t("navigation.with_video")}`;
        if (Array.isArray(models) && models.length > 0) {
          setFilteredModels(
            models.filter(
              (model: IModel) =>
                model.is_enable && model.videos.filter((video: IVideo) => video.status === VideoStatus.Applyed).length > 0
            )
          );
        }
        setActiveHeaderLink(3);
        break;
    }
  }, [type, models, i18n.resolvedLanguage]);

  const calcIsNew = (create_date: Date) => {
    var now = new Date();
    var createDate = new Date(create_date);
    var difference = Math.abs(now.getTime() - createDate.getTime()) / (1000 * 60 * 60 * 24);
    return difference <= 7;
  };

  const metaTitle = i18n.language === 'ru' ? 'Главная страница - Мой сайт' : 'Home Page - My Site';
  const metaDescription = i18n.language === 'ru'
    ? 'Это страница модели sexavenueekaterinburg.'
    : 'This is the model page of sexavenueekaterinburg.';
  const metaKeywords = i18n.language === 'ru'
    ? 'модель, сайт эскорта, найдите свою собственную модель/эскорт в России'
    : 'model, escort site, find your own model/ escort in Russia';
  return (
    <>
    <Helmet>
        
        <html lang={i18n.language} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        <meta name="keywords" content={metaKeywords} />
      </Helmet>
    <div className={styles.wrapper_content}>
      <Models isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} forModerator={forModerator} />
      <Filters isFiltersActive={isFiltersActive} setIsFiltersActive={setIsFiltersActive} />
    </div>
    </>
  );
};

export default Home;
