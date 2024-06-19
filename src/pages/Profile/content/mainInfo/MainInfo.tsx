import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "../../Profile.module.sass";

import { ProfileType } from "../../../../enums/profileType";

import { Check as CheckIcon } from "../../../../assets/Check";

const MainInfo = () => {
  const { t, i18n } = useTranslation();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.basic_information")}`;
  });

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.basic_information")}`;
  }, [i18n.resolvedLanguage]);

  return (
    <div className={styles.content}>
      <button className={styles.addvertise_button} type="button" onClick={() => navigate("/model_settings/new")}>
        {t("profile.add_advertisement")}
      </button>
      <div className={styles.title}>{t("profile.basic_information")}</div>
      <div className={styles.main_info}>
        <div className={styles.item}>
          <div className={styles.label}>{t("profile.agency_id")}</div>
          <div className={styles.value}>{String(profile.id).padStart(8, "0")}</div>
        </div>
        {profile.type === ProfileType.Agency ? (
          <div className={styles.item}>
            <div className={styles.label}>{t("profile.balance")}</div>
            <div className={styles.value}>
              {profile.balance} {t("profile.coins")}
            </div>
            <button className={styles.balance_button} type="button">
              {t("profile.deposit")}
            </button>
          </div>
        ) : null}
        <div />
        <div className={styles.notification}>
          <div className={styles.checkbox}>
            <CheckIcon fill="#1B1B1B" />
          </div>
          {t("profile.want_to_recieve_news")}
        </div>
        <div className={styles.notification}>
          <div className={styles.checkbox}>
            <CheckIcon fill="#1B1B1B" />
          </div>
          {t("profile.notification_inactivity")}
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
