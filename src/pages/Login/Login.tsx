/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../..//hooks/useTypedSelector";

import MessageModal from "../../components/Modals/MessageModal";

import styles from "./Login.module.sass";

import LoginContent from "../../components/LoginContent/LoginContent";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const Login = () => {
  const { t, i18n } = useTranslation();
  const { setActiveHeaderLink, setProfileStatuses } = useActions();
  const navigate = useNavigate();
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    document.title = t("global.authorization");
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    document.title = t("global.authorization");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (profileStatuses.login.status === ServerStatusType.Error) {
      if (profileStatuses.login.error !== "global.invalid_username") {
        setErrorMessage(profileStatuses.login.error);
        setProfileStatuses({ ...profileStatuses, login: initServerStatus() });
        setIsMessageModalShow(true);
      }
    }
  }, [profileStatuses]);

  return (
    <div className={styles.wrapper_content}>
      <LoginContent />
      <MessageModal
        text={t(`${errorMessage}`)}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Login;
