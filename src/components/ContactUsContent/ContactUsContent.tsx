/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import globalStyles from "../../App.module.sass";
import styles from "./ContactUsContent.module.sass";

const ContactUsContent = () => {
  const { t } = useTranslation();
  const { addMessage, setMessage } = useActions();
  const message = useTypedSelector((state) => state.messageReducer.message);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    if (message.email) {
      setIsButtonEnabled(message.email !== "" && message.name.trim() !== "" && message.message.trim() !== "");
    }
  }, [message]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    if (message.email && message.email !== "" && message.name.trim() !== "" && message.message.trim() !== "") {
      addMessage({
        message: message,
        emailTitle: t("emails.message_from_site"),
        emailName: t("global.name"),
        emailMessage: t("global.message"),
      });
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("navigation.contact_us")}</div>
      <form onSubmit={handleOnSubmit}>
        <div className={styles.input_field}>
          {t("global.name")}
          <input
            placeholder=""
            type="name"
            required
            onChange={(event) => setMessage({ ...message, name: event.target.value.trim() })}
            value={message.name}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <div className={styles.input_field}>
          {t("global.email_address")}
          <input
            placeholder=""
            type="email"
            required
            onChange={(event) => setMessage({ ...message, email: event.target.value.trim() })}
            value={message.email}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <div className={styles.textarea_field}>
          <div className={styles.label}>{t("global.message")}</div>
          <textarea
            placeholder=""
            required
            onChange={(event) => setMessage({ ...message, message: event.target.value })}
            value={message.message}
          />
          <div className={globalStyles.required}>*</div>
        </div>
        <button type="submit" disabled={!isButtonEnabled}>
          {t("global.send")}
        </button>
      </form>
    </div>
  );
};

export default ContactUsContent;
