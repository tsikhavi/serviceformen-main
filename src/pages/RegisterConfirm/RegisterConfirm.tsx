import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import parse from "html-react-parser";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./RegisterConfirm.module.sass";

import { ModalType } from "../../components/Modals/ModalType";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const RegisterConfirm = () => {
  const { t, i18n } = useTranslation();
  const { token, login } = useParams();
  const navigate = useNavigate();
  const { confirmProfile, setActiveHeaderLink, setModalType, setIsModalShow, setProfileStatuses } = useActions();
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [isCorrectData, setIsCorrectData] = useState(false);

  useEffect(() => {
    document.title = t("global.confirmation_of_registration");
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    document.title = t("global.confirmation_of_registration");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (token && token !== "" && login && login !== "") {
    } else {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (profileStatuses.confirmProfile.status === ServerStatusType.Success) {
      setIsCorrectData(true);
      setProfileStatuses({ ...profileStatuses, confirmProfile: initServerStatus() });
    }
  }, [profileStatuses]);

  const handleSignInClick = () => {
    if (windowSize.innerWidth < 1201) {
      navigate("/login");
    } else {
      setModalType(ModalType.Authorization);
      setIsModalShow(true);
    }
  };

  return (
    <>
      {isCorrectData ? (
        <div className={styles.content}>
          <div className={styles.title}>{t("global.confirmation_of_registration")}</div>
          <div className={styles.description}>{parse(t("global.email_vas_verified"))}</div>
          <button type="button" onClick={handleSignInClick}>
            {t("global.authorization")}
          </button>
        </div>
      ) : (
        <div className={styles.content}>
          <button onClick={() => confirmProfile({ login: login!, token: token! })}>
            {t("global.complete_registration")}
          </button>
        </div>
      )}
    </>
  );
};

export default RegisterConfirm;
