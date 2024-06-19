/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./ContactUs.module.sass";

import MessageModal from "../../components/Modals/MessageModal";
import ContactUsContent from "../../components/ContactUsContent/ContactUsContent";

import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const { t, i18n } = useTranslation();
  const { setActiveHeaderLink, setIsNoScroll, setMessageStatus, setMessage } = useActions();
  const messageStatus = useTypedSelector((state) => state.messageReducer.serverStatus);
  const emptyMessage = useTypedSelector((state) => state.messageReducer.emptyMessage);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = t("navigation.contact_us");
    setActiveHeaderLink(6);
    setMessage(emptyMessage);
  }, []);

  useEffect(() => {
    document.title = t("navigation.contact_us");
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    setIsNoScroll(isMessageModalShow);
  }, [isMessageModalShow]);

  useEffect(() => {
    if (messageStatus.status === ServerStatusType.Success) {
      setInfoMessage(t("global.success_message_send"));
      setMessageStatus(initServerStatus());
      setIsMessageModalShow(true);
      setMessage(emptyMessage);
    }
    if (messageStatus.status === ServerStatusType.Error) {
      setInfoMessage(t(messageStatus.error));
      setMessageStatus(initServerStatus());
      setIsMessageModalShow(true);
    }
  }, [messageStatus]);

  const handleMessageOkOnClick = () => {
    setIsMessageModalShow(false);
  };

  const metaTitle = i18n.language === 'ru' ? 'Главная страница - Мой сайт' : 'Home Page - My Site';
  const metaDescription = i18n.language === 'ru'
    ? 'Это Контактная страница sexavenueekaterinburg sexavenueekaterinburg'
    : 'Contact us on sexavenueekaterinburg.';
  const metaKeywords = i18n.language === 'ru'
    ? 'Связаться с sexavenueekaterinburg'
    : 'Contact us on our website sexavenueekaterinburg ';
  return (
    <>
    <Helmet>
        
        <html lang={i18n.language} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
      </Helmet>

    <div className={styles.wrapper_content}>
      <ContactUsContent />
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOkOnClick}
        isShow={isMessageModalShow}
      />
    </div>
    </>
  );
};

export default ContactUs;
