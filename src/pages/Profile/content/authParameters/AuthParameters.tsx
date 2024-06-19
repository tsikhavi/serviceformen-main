/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Profile.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";

import { IProfile } from "../../../../types/profile/profile/profile";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

const AuthParameters = () => {
  const { t, i18n } = useTranslation();
  const { updateProfile, setProfileStatuses } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [email, setEmail] = useState(profile.login);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.login_options")}`;
    setEmail("");
    setPassword("");
    setNewPassword("");
    setProfileStatuses({ ...profileStatuses, updateProfile: initServerStatus() });
  }, []);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.login_options")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    setEmail(profile.login);
  }, [profile]);

  useEffect(() => {
    if (profileStatuses.updateProfile.status === ServerStatusType.Success) {
      setInfoMessage(t("global.data_successfully_updated"));
      setProfileStatuses({ ...profileStatuses, updateProfile: initServerStatus() });
      setEmail("");
      setPassword("");
      setNewPassword("");
      setIsMessageModalShow(true);
    }
    if (profileStatuses.updateProfile.status === ServerStatusType.Error) {
      setInfoMessage(profileStatuses.updateProfile.error);
      setProfileStatuses({ ...profileStatuses, updateProfile: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [profileStatuses]);

  useEffect(() => {
    setIsButtonEnabled(
      email !== "" && password !== "" && newPassword !== "" && password.length > 5 && newPassword.length > 6
    );
  }, [email, password, newPassword]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setInfoMessage("");
    if (email !== "" && password !== "" && newPassword !== "") {
      if (password === profile.password) {
        updateProfile({
          profile: {
            id: profile.id,
            login: email,
            password: newPassword,
          } as IProfile,
        });
      } else {
        setInfoMessage(t("profile.incorrect_current_password"));
      }
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("profile.login_options")}</div>
      <div className={styles.main_info}>
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
          <div className={styles.input_field}>
            <div className={styles.label}>{t("global.current_password")}</div>
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
              onChange={(event) => setNewPassword(event.target.value.trim())}
              value={newPassword}
              minLength={6}
            />
            <div className={globalStyles.required}>*</div>
          </div>
          <button type="submit" disabled={!isButtonEnabled}>
            {t("global.save")}
          </button>
        </form>
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default AuthParameters;
