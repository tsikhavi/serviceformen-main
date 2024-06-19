/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./Modal.module.sass";

import MessageModal from "./MessageModal";

import RegisterContent from "../RegisterContent/RegisterContent";

import { ModalType } from "../Modals/ModalType";
import { ServerStatusType } from "../../enums/serverStatusType";
import { initServerStatus } from "../../types/main/serverStatus";

import { Close as CloseIcon } from "../../assets/Close";

const RegisterModal = () => {
  const { t } = useTranslation();
  const { setIsNoScroll, setIsModalShow, setModalType, setProfileStatuses } = useActions();
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const isModalShow = useTypedSelector((state) => state.mainReducer.isModalShow);
  const modalType = useTypedSelector((state) => state.mainReducer.modalType);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    setIsNoScroll(isModalShow);
  }, [isModalShow]);

  useEffect(() => {
    if (modalType === ModalType.Registration && profileStatuses.register.status === ServerStatusType.Error) {
      if (profileStatuses.register.error !== "global.user_already_registered") {
        setErrorMessage(profileStatuses.register.error);
        setProfileStatuses({ ...profileStatuses, register: initServerStatus() });
        setIsMessageModalShow(true);
      }
    }
  }, [profileStatuses]);

  const handleCloseOnClick = () => {
    setIsModalShow(false);
    setModalType(ModalType.None);
  };

  return (
    <div className={`${styles.modal} ${isModalShow && modalType === ModalType.Registration ? styles.active : ""}`}>
      <div
        className={`${styles.overlay} ${isModalShow && modalType === ModalType.Registration ? styles.active : ""}`}
        onClick={handleCloseOnClick}
      />
      <div className={styles.modal_content}>
        <div className={styles.modal_close} onClick={handleCloseOnClick}>
          <CloseIcon fill="#1B1B1B" />
        </div>
        {modalType === ModalType.Registration ? <RegisterContent /> : null}
      </div>
      <MessageModal
        text={t(`${errorMessage}`)}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
    </div>
  );
};

export default RegisterModal;
