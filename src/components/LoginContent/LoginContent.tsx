import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./LoginContent.module.sass";

import { ModalType } from "../Modals/ModalType";
import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

const LoginContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, setModalType, setIsModalShow, setProfileStatuses } = useActions();
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");

  useEffect(() => {
    setIsButtonEnabled(email !== "" && password.length > 5);
    setErrorForm("");
  }, [email, password]);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isModalShow]);

  useEffect(() => {
    if (profileStatuses.login.status === ServerStatusType.Error) {
      if (profileStatuses.login.error === "global.invalid_username") {
        setErrorForm(profileStatuses.login.error);
        setProfileStatuses({ ...profileStatuses, login: initServerStatus() });
      }
    }
  }, [profileStatuses]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (email !== "" && password.length > 5) {
      setProfileStatuses({ ...profileStatuses, login: initServerStatus() });
      const loginData = await login({ login: email, password: password }) as any;
      if (loginData && loginData.payload && loginData.payload.success && loginData.payload.type === 0) {
        navigate("/profile");
      }
    }
  };

  const handleRegisterOnClick = () => {
    if (windowSize.innerWidth < 1201) {
      navigate("/register");
    } else {
      setModalType(ModalType.Registration);
    }
  };

  const handleForgotPasswordOnClick = () => {
    setIsModalShow(false);
    navigate("/forgot_password");
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("global.authorization")}</div>
      <form onSubmit={handleOnSubmit}>
        <input
          placeholder={t("global.login")}
          type="email"
          required
          onChange={(event) => setEmail(event.target.value.trim())}
          value={email}
        />
        <input
          placeholder={t("global.password")}
          type="password"
          required
          onChange={(event) => setPassword(event.target.value.trim())}
          value={password}
          minLength={6}
        />
        {errorForm !== "" ? <div className={styles.error}>{t(errorForm)}</div> : null}
        <div className={styles.forgot_password} onClick={handleForgotPasswordOnClick}>
          {t("global.forgot_your_password")}?
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t("global.enter")}
        </button>
      </form>
      <div className={styles.register} onClick={handleRegisterOnClick}>
        {t("global.registration")}
      </div>
    </div>
  );
};

export default LoginContent;
