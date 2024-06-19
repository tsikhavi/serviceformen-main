/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import MessageModal from "./MessageModal";
import ContactUsContent from "../ContactUsContent/ContactUsContent";

import { ModalType } from "../Modals/ModalType";
import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Close as CloseIcon } from "../../assets/Close";

const ContactUsModal = () => {
  const { t } = useTranslation();
  const { setIsNoScroll, setIsModalShow, setModalType, setMessageStatus, setMessage } = useActions();
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const modalType = useTypedSelector((state) => state.mainReducer.modalType);
  const messageStatus = useTypedSelector((state) => state.messageReducer.serverStatus);
  const emptyMessage = useTypedSelector((state) => state.messageReducer.emptyMessage);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    setIsNoScroll(isModalShow);
    if (isModalShow) {
      setMessage(emptyMessage);
    }
  }, [isModalShow]);

  useEffect(() => {
    if (modalType === ModalType.ContactUs) {
      if (messageStatus.status === ServerStatusType.Success) {
        setInfoMessage(t("global.success_message_send"));
        setMessageStatus(initServerStatus());
        setIsModalShow(false);
        setModalType(ModalType.None);
        setIsMessageModalShow(true);
        setMessage(emptyMessage);
      }
      if (messageStatus.status === ServerStatusType.Error) {
        setInfoMessage(t(messageStatus.error));
        setMessageStatus(initServerStatus());
        setIsMessageModalShow(true);
      }
    }
  }, [messageStatus]);

  const handleCloseOnClick = () => {
    setIsModalShow(false);
    setModalType(ModalType.None);
    setMessage(emptyMessage);
  };

  const handleMessageOkOnClick = () => {
    setIsMessageModalShow(false);
  };

  return (
    <div className={`${styles.modal} ${isModalShow && modalType === ModalType.ContactUs ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isModalShow && modalType === ModalType.ContactUs ? styles.active : ""}`}
        onClick={handleCloseOnClick}
      />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} onClick={handleCloseOnClick}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        {modalType === ModalType.ContactUs ? <ContactUsContent /> : null}
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOkOnClick}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default ContactUsModal;
