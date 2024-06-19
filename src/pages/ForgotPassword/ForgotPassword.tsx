import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MessageModal from "../../components/Modals/MessageModal";

import globalStyles from "../../App.module.sass";
import styles from "./ForgotPassword.module.sass";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const ForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setActiveHeaderLink, generateToken, restorePassword, setProfileStatuses } = useActions();
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const token = useTypedSelector((state) => state.profileReducer.token);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [email, setEmail] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = t("global.password_recovery");
    setActiveHeaderLink(-1);
    setProfileStatuses({ ...profileStatuses, restorePassword: initServerStatus() });
  }, []);

  useEffect(() => {
    document.title = t("global.password_recovery");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    setIsButtonEnabled(email !== "");
  }, [email]);

  useEffect(() => {
    if (
      profileStatuses.generateToken.status === ServerStatusType.Success &&
      token !== "" &&
      profileStatuses.restorePassword.status === ServerStatusType.InProgress
    ) {
      setProfileStatuses({ ...profileStatuses, generateToken: initServerStatus() });

      restorePassword({
        login: email,
        token: token,
        emailTitle: t("global.password_recovery"),
        emailDescription: t("global.forgot_password_description"),
        emailLogin: t("global.login"),
        emailButtonText: t("global.recover_password"),
      });
    }
    if (profileStatuses.restorePassword.status === ServerStatusType.Success) {
      setInfoMessage(t("global.success_email_send"));
      setIsMessageModalShow(true);
    }
    if (profileStatuses.restorePassword.status === ServerStatusType.Error) {
      setInfoMessage(t(`${profileStatuses.restorePassword.error}`));
      setIsMessageModalShow(true);
    }
  }, [profileStatuses]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim() !== "") {
      setProfileStatuses({
        ...profileStatuses,
        generateToken: initServerStatus(),
        restorePassword: { ...profileStatuses.restorePassword, status: ServerStatusType.InProgress },
      });
      generateToken({ login: email });
    }
  };

  const handleMessageOkOnClick = () => {
    setIsMessageModalShow(false);
    setProfileStatuses({ ...profileStatuses, generateToken: initServerStatus(), restorePassword: initServerStatus() });
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("global.password_recovery")}</div>
      <div className={styles.description}>{t("global.password_recovery_description")}</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_field}>
          <div className={styles.label}>{t("global.email_address")}</div>
          <input
            placeholder=""
            type="email"
            required
            onChange={(event) => setEmail(event.target.value.trim())}
            value={email}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t("global.continue")}
        </button>
      </form>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOkOnClick}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default ForgotPassword;
