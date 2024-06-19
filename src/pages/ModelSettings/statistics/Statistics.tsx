/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import pageStyles from "../ModelSettings.module.sass";
import styles from "./Statistics.module.sass";

import { IModelView } from "src/types/model/modelView/modelView";
import { MonthsList } from "./monthsList";

const Statistics = () => {
  const { t, i18n } = useTranslation();
  const { setActiveHeaderLink } = useActions();
  const model = useTypedSelector((state) => state.modelReducer.model);
  const modelViews = useTypedSelector((state) => state.modelReducer.modelViews);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.statistics")}`;
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.statistics")}`;
  }, [i18n.resolvedLanguage]);

  return (
    <div className={pageStyles.content}>
      <div className={pageStyles.title}>{`${t("model.statistics")} (${model.name})`}</div>
      <div className={styles.part}>
        {`${t("model.day_count_views")}: `}
        <span>
          {Array.isArray(modelViews)
            ? modelViews.filter(
                (modelView: IModelView) =>
                  new Date(modelView.view_date).getFullYear() === new Date().getFullYear() &&
                  new Date(modelView.view_date).getMonth() === new Date().getMonth() &&
                  new Date(modelView.view_date).getDate() === new Date().getDate()
              ).length
            : ""}
        </span>
      </div>
      <div className={`${styles.part} ${styles.monthly}`}>
        {`${t("model.month_count_views")}`}
        {modelViews.length > 0 && new Date(model.create_date).getFullYear() !== new Date().getFullYear() ? (
          <div className={styles.year_selector}>
            {[...Array(new Date().getFullYear() - new Date(model.create_date).getFullYear() + 1)].map((_item, index) => (
              <div
                className={`${styles.year} ${currentYear === new Date().getFullYear() - index ? styles.active : ""}`}
                onClick={() => setCurrentYear(new Date().getFullYear() - index)}
              >
                {new Date().getFullYear() - index}
              </div>
            ))}
          </div>
        ) : null}
        {currentYear === new Date().getFullYear() && currentYear !== new Date(model.create_date).getFullYear() ? (
          <div className={styles.views}>
            {[...Array(new Date().getMonth() + 1)].map((_item, index) => (
              <div className={styles.view}>
                <div className={styles.month}>
                  {i18n.resolvedLanguage === "ru" ? MonthsList[index].month : MonthsList[index].month_eng}
                </div>
                <div className={styles.value}>
                  {modelViews.length > 0
                    ? modelViews.filter(
                        (modelView: IModelView) =>
                          new Date(modelView.view_date).getFullYear() === currentYear &&
                          new Date(modelView.view_date).getMonth() === index
                      ).length
                    : 0}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {currentYear !== new Date().getFullYear() && currentYear === new Date(model.create_date).getFullYear() ? (
          <div className={styles.views}>
            {[...Array(12 - new Date(model.create_date).getMonth())].map((_item, index) => (
              <div className={styles.view}>
                <div className={styles.month}>
                  {i18n.resolvedLanguage === "ru"
                    ? MonthsList[index + new Date(model.create_date).getMonth()].month
                    : MonthsList[index + new Date(model.create_date).getMonth()].month_eng}
                </div>
                <div className={styles.value}>
                  {modelViews.length > 0
                    ? modelViews.filter(
                        (modelView: IModelView) =>
                          new Date(modelView.view_date).getFullYear() === currentYear &&
                          new Date(modelView.view_date).getMonth() === index + new Date(model.create_date).getMonth()
                      ).length
                    : 0}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {currentYear !== new Date().getFullYear() && currentYear !== new Date(model.create_date).getFullYear() ? (
          <div className={styles.views}>
            {[...Array(12)].map((_item, index) => (
              <div className={styles.view}>
                <div className={styles.month}>
                  {i18n.resolvedLanguage === "ru" ? MonthsList[index].month : MonthsList[index].month_eng}
                </div>
                <div className={styles.value}>
                  {modelViews.length > 0
                    ? modelViews.filter(
                        (modelView: IModelView) =>
                          new Date(modelView.view_date).getFullYear() === currentYear &&
                          new Date(modelView.view_date).getMonth() === index
                      ).length
                    : 0}
                </div>
              </div>
            ))}
          </div>
        ) : null}
        {currentYear === new Date().getFullYear() && currentYear === new Date(model.create_date).getFullYear() ? (
          <div className={styles.views}>
            {[...Array(new Date().getMonth() + 1 - new Date(model.create_date).getMonth())].map((_item, index) => (
              <div className={styles.view}>
                <div className={styles.month}>
                  {i18n.resolvedLanguage === "ru"
                    ? MonthsList[index + new Date(model.create_date).getMonth()].month
                    : MonthsList[index + new Date(model.create_date).getMonth()].month_eng}
                </div>
                <div className={styles.value}>
                  {modelViews.length > 0
                    ? modelViews.filter(
                        (modelView: IModelView) =>
                          new Date(modelView.view_date).getFullYear() === currentYear &&
                          new Date(modelView.view_date).getMonth() === index + new Date(model.create_date).getMonth()
                      ).length
                    : 0}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Statistics;
