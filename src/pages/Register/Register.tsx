/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MessageModal from "../../components/Modals/MessageModal";

import styles from "./Register.module.sass";

import RegisterContent from "../../components/RegisterContent/RegisterContent";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const Register = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setActiveHeaderLink, setProfileStatuses } = useActions();
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    document.title = t("global.registration");
    setActiveHeaderLink(-1);
  }, []);

  useEffect(() => {
    document.title = t("global.registration");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (profileStatuses.register.status === ServerStatusType.Error) {
      if (profileStatuses.register.error !== "global.user_already_registered") {
        setErrorMessage(profileStatuses.register.error);
        setProfileStatuses({ ...profileStatuses, register: initServerStatus() });
        setIsMessageModalShow(true);
      }
    }
  }, [profileStatuses]);

  return (
    <div className={styles.wrapper_content}>
      <RegisterContent />
      <MessageModal
        text={t(`${errorMessage}`)}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default Register;
