import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import MessageModal from "../../components/Modals/MessageModal";

import globalStyles from "../../App.module.sass";
import styles from "./ChangePassword.module.sass";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const ChangePassword = () => {
  const { t, i18n } = useTranslation();
  const { token, login } = useParams();
  const navigate = useNavigate();
  const { setActiveHeaderLink, changePassword, setProfileStatuses } = useActions();
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const isAuth = useTypedSelector((state) => state.profileReducer.isAuth);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    document.title = t("global.password_change");
    setActiveHeaderLink(-1);
    setProfileStatuses({ ...profileStatuses, changePassword: initServerStatus() });
  }, []);

  useEffect(() => {
    document.title = t("global.password_change");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  useEffect(() => {
    if (token && login && token !== "" && login !== "") {
    } else {
      navigate("/");
    }
  }, [token, login]);

  useEffect(() => {
    setIsButtonEnabled(password !== "" && repeatPassword !== "" && password === repeatPassword && password.length > 6);
  }, [password, repeatPassword]);

  useEffect(() => {
    if (profileStatuses.changePassword.status === ServerStatusType.Success) {
      setInfoMessage(t("global.password_was_changed"));
      setIsMessageModalShow(true);
    }
    if (profileStatuses.changePassword.status === ServerStatusType.Error) {
      setInfoMessage(t(`${profileStatuses.changePassword.error}`));
      setIsMessageModalShow(true);
    }
  }, [profileStatuses]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== "" && repeatPassword !== "" && password === repeatPassword && password.length > 6) {
      setProfileStatuses({
        ...profileStatuses,
        changePassword: { ...profileStatuses.changePassword, status: ServerStatusType.InProgress },
      });
      changePassword({ login: login!, token: token!, password: password });
    }
  };

  const handleMessageOkOnClick = () => {
    setIsMessageModalShow(false);
    if (profileStatuses.changePassword.status === ServerStatusType.Success) {
      setProfileStatuses({ ...profileStatuses, changePassword: initServerStatus() });
      navigate("/");
    } else {
      setProfileStatuses({ ...profileStatuses, changePassword: initServerStatus() });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("global.password_recovery")}</div>
      <div className={styles.description}>{t("global.password_recovery_description")}</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_field}>
          <div className={styles.label}>{t("global.new_password")}</div>
          <input
            placeholder=""
            type="password"
            required
            onChange={(event) => setPassword(event.target.value.trim())}
            value={password}
            minLength={6}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <div className={styles.input_field}>
          <div className={styles.label}>{t("global.new_password")}</div>
          <input
            placeholder=""
            type="password"
            required
            onChange={(event) => setRepeatPassword(event.target.value.trim())}
            value={repeatPassword}
            minLength={6}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t("global.save")}
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

export default ChangePassword;
