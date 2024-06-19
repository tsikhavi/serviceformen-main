/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import styles from "../../Profile.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";
import ConfirmMessageModal from "../../../../components/Modals/ConfirmMessageModal";

import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

const DeleteProfile = () => {
  const { t, i18n } = useTranslation();
  const { deleteProfile, logout, setProfileStatuses } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const profileStatuses = useTypedSelector((state) => state.profileReducer.serverStatuses);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.deleting_a_profile")}`;
    setProfileStatuses({ ...profileStatuses, deleteProfile: initServerStatus() });
  });

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.deleting_a_profile")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (profileStatuses.deleteProfile.status === ServerStatusType.Success) {
      logout();
      setInfoMessage(t("profile.profile_has_been_deleted"));
      setIsMessageModalShow(true);
    }
    if (profileStatuses.deleteProfile.status === ServerStatusType.Error) {
      setInfoMessage(profileStatuses.deleteProfile.error);
      setIsMessageModalShow(true);
    }
  }, [profileStatuses]);

  const handlerMessageOkOnClick = () => {
    setIsMessageModalShow(false);
    setProfileStatuses({ ...profileStatuses, deleteProfile: initServerStatus() });
  };

  const handlerConfirmDeleteOnClick = (agencyId: number) => {
    deleteProfile({ agency_id: agencyId });
    setIsConfirmModalShow(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("profile.deleting_a_profile")}</div>
      <div className={styles.main_info}>
        <div className={styles.item}>{t("profile.do_you_really_want_delete_account")}</div>
      </div>
      <button type="button" onClick={() => deleteProfile({ agency_id: profile.id })}>
        {t("profile.delete_a_profile")}
      </button>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handlerMessageOkOnClick}
        isShow={isMessageModalShow}
      />
      <ConfirmMessageModal
        text={t("global.delete_profile_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={() => handlerConfirmDeleteOnClick(profile.id)}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </div>
  );
};

export default DeleteProfile;
