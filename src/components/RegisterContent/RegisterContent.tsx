
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

import globalStyles from "../../App.module.sass";
import styles from "./RegisterContent.module.sass";

import { ModalType } from "../Modals/ModalType";

import { ServerStatusType } from "../../enums/serverStatusType";
import { ProfileType } from "../../enums/profileType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Check as CheckIcon } from "../../assets/Check";

const RegisterContent = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { generateToken, register, setModalType, setProfileStatuses } = useActions();
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const token = useTypedSelector((state) => state.profileReducer.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(ProfileType.Agency);
  const [isTermsApplyChecked, setIsTermsApplyChecked] = useState(false);
  const [isPersonalDataApplyChecked, setIsPersonalDataApplyChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [errorForm, setErrorForm] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");


  const handleOnSubmit = (event) => {
    setProfileStatuses({ ...profileStatuses, generateToken: initServerStatus(), register: initServerStatus() });
    event.preventDefault();
    if (email !== "" && password !== "" && isTermsApplyChecked && isPersonalDataApplyChecked && captchaToken !== "") {
      setProfileStatuses({
        ...profileStatuses,
        generateToken: initServerStatus(),
        register: { ...profileStatuses.restorePassword, status: ServerStatusType.InProgress },
      });
      generateToken({ login: email });
    } else {
      setErrorForm("global.fill_all_fields");
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  useEffect(() => {
    if (captchaToken !== "") {
      setIsButtonEnabled(true);
    }
  }, [captchaToken]);

  useEffect(() => {
    if (profileStatuses.register.status === ServerStatusType.Error) {
      if (profileStatuses.register.error === "global.user_already_registered") {
        setErrorForm(profileStatuses.register.error);
        setProfileStatuses({ ...profileStatuses, register: initServerStatus() });
      }
    }
  }, [profileStatuses]);

  const handleEmailOnChange = (event) => {
    setEmail(event.target.value.trim());
  };

  const handlePasswordOnChange = (event) => {
    setPassword(event.target.value.trim());
  };

  const handleSetIsTermsApplyedOnClick = () => {
    setIsTermsApplyChecked(!isTermsApplyChecked);
  };

  const handleSetIsPersonalDataApplyedOnClick = () => {
    setIsPersonalDataApplyChecked(!isPersonalDataApplyChecked);
  };

  const handleAuthOnClick = () => {
    if (windowSize.innerWidth < 1201) {
      navigate("/login");
    } else {
      setModalType(ModalType.Authorization);
    }
  };

  const handleContactUsOnClick = () => {
    if (windowSize.innerWidth < 1201) {
      navigate("/contact");
    } else {
      setModalType(ModalType.ContactUs);
    }
  };

  useEffect(() => {
    if (profileStatuses.generateToken.status === ServerStatusType.Success && token !== "") {
      setProfileStatuses({ ...profileStatuses, generateToken: initServerStatus() });
      register({
        login: email,
        password: password,
        token: token,
        type: type,
        emailTitle: t("emails.registration_on_the_site"),
        emailLogin: t("global.login"),
        emailPassword: t("global.password"),
        emailDescription: t("emails.you_have_reistered"),
        emailButtonText: t("global.complete_registration"),
        emailComplete: t("emails.to_complete_registration"),
      });
    }
  }, [profileStatuses]);

  useEffect(() => {
    setErrorForm("");
    setIsButtonEnabled(email !== "" && password !== "" && isTermsApplyChecked && isPersonalDataApplyChecked);
  }, [email, password, isTermsApplyChecked, isPersonalDataApplyChecked]);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isModalShow]);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("global.registration")}</div>
      {profileStatuses.register.status !== ServerStatusType.Success ? (
        <>
          <form onSubmit={handleOnSubmit}>
            <div className={styles.radio_group_container}>
              <div className={styles.label}>{t("profile.type")}</div>
              <div className={styles.radio_group}>
              <div className={styles.item}>
                <div
                  className={`${styles.button} ${type === ProfileType.Agency ? styles.active : ""}`}
                  onClick={() => setType(ProfileType.Agency)}
                />
                {t("profile.agency")}
                <div className={styles.tooltip}>
                  <p className={styles.warning_info}>-{' '}{t("profile.about_agent")}</p>
                  <span className={styles.tooltiptext}>{t("profile.about_agentinfo")}</span>
                </div>
              </div>
              <div className={styles.item}>
                <div
                  className={`${styles.button} ${type === ProfileType.Guest ? styles.active : ""}`}
                  onClick={() => setType(ProfileType.Guest)}
                />
                {t("profile.guest")}
                <div className={styles.tooltip}>
                  <p className={styles.warning_info}>-{' '}{t("profile.about_guest")}</p>
                  <span className={styles.tooltiptext}>{t("profile.about_guestinfo")}</span>
                </div>
              </div>

                
              </div>
            </div>
            <div className={styles.input_field}>
              {t("global.email_address")}
              <input placeholder="" type="email" required onChange={handleEmailOnChange} value={email} />
            </div>
            <div className={styles.input_field}>
              {t("global.password")}
              <input
                placeholder=""
                type="password"
                required
                onChange={handlePasswordOnChange}
                value={password}
                minLength={6}
              />
            </div>
            {errorForm !== "" ? <div className={styles.error}>{t(`${errorForm}`)}</div> : null}
            <div></div>
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${globalStyles.white} ${
                  isTermsApplyChecked ? globalStyles.active : " "
                }`}
                aria-hidden="true"
                onClick={handleSetIsTermsApplyedOnClick}
              >
                {isTermsApplyChecked && <CheckIcon fill="#98042D" />}
              </span>
              <div className={globalStyles.text}>
                {t("global.i_have_read")}{' '} <span>Terms and Conditions, Privacy policy</span>
              </div>
            </label>
            <label className={globalStyles.checkbox}>
              <input type="checkbox" />
              <span
                className={`${globalStyles.checkbox_mark} ${globalStyles.white} ${
                  isPersonalDataApplyChecked ? globalStyles.active : " "
                }`}
                aria-hidden="true"
                onClick={handleSetIsPersonalDataApplyedOnClick}
              >
                {isPersonalDataApplyChecked && <CheckIcon fill="#98042D" />}
              </span>
              <div className={globalStyles.text}>{t("global.i_agree")}</div>
            </label>
            <div className={styles.captcha_container}>
              <div className={styles.captcha}>
                <div
                  className="g-recaptcha"
                  data-sitekey={process.env.REACT_APP_PRIVATE_CAPTCHA_ID}
                  data-callback={handleCaptchaChange}
                  data-size="invisible"
                />
              </div>
            </div>
            <button type="submit" disabled={!isButtonEnabled}>
              {t("global.complete_registration")}
            </button>
          </form>

          <div className={styles.authorization} onClick={handleAuthOnClick}>
            {t("global.authorization")}
          </div>
        </>
      ) : (
        <>
          <div className={styles.success_content}>
            <div className={styles.success_title}>{t("global.thanks_for_register")}</div>
            <div className={styles.success_description}>{t("global.confirmation_email_was_send")}</div>
          </div>
          <div className={styles.bottom_content}>
            {t("global.if_email_has_not_recieved")}
            <div className={styles.contact_us} onClick={handleContactUsOnClick}>
              {t("navigation.contact_us").toLowerCase()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterContent;