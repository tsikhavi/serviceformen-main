/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Profile.module.sass";

import MessageModal from "../../../../components/Modals/MessageModal";
import ConfirmMessageModal from "../../../../components/Modals/ConfirmMessageModal";

import { IProfile } from "../../../../types/profile/profile/profile";
import { IBlacklistAccess } from "../../../../types/profile/blacklist/blacklistAccess";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Close as CloseIcon } from "../../../../assets/Close";

const AccessToBlacklist = () => {
  const { t, i18n } = useTranslation();
  const { addBlacklistAccess, deleteBlacklistAccess, setBlacklistStatuses, getBlacklistAccess } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const agencies = useTypedSelector((state) => state.profileReducer.agencies);
  const accessToBlacklist = useTypedSelector((state) => state.blacklistReducer.blacklistAccess);
  const blacklistStatuses = useTypedSelector((state) => state.blacklistReducer.serverStatuses);
  const [filteredAccessToBlacklist, setFilteredAccessToBlacklist] = useState(
    accessToBlacklist.filter((access: IBlacklistAccess) => access.agency_id === profile.id)
  );
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [deletedAccess, setDeletedAccess] = useState(0);
  const [accessTo, setAccessTo] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    setFilteredAccessToBlacklist(accessToBlacklist.filter((access: IBlacklistAccess) => access.agency_id === profile.id));
  }, [accessToBlacklist]);

  useEffect(() => {
    if (blacklistStatuses.addBlacklistAccess.status === ServerStatusType.Success) {
      setInfoMessage(t("profile.access_granted"));
      setAccessTo("");
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, addBlacklistAccess: initServerStatus() });
      getBlacklistAccess({ agency_id: profile.id });
    }
    if (blacklistStatuses.addBlacklistAccess.status === ServerStatusType.Error) {
      setInfoMessage(blacklistStatuses.addBlacklistAccess.error);
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, addBlacklistAccess: initServerStatus() });
    }
    if (blacklistStatuses.deleteBlacklistAccess.status === ServerStatusType.Success) {
      setBlacklistStatuses({ ...blacklistStatuses, deleteBlacklistAccess: initServerStatus() });
      getBlacklistAccess({ agency_id: profile.id });
    }
    if (blacklistStatuses.deleteBlacklistAccess.status === ServerStatusType.Error) {
      setInfoMessage(blacklistStatuses.deleteBlacklistAccess.error);
      setIsConfirmModalShow(false);
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, deleteBlacklistAccess: initServerStatus() });
    }
  }, [blacklistStatuses]);

  useEffect(() => {
    setIsButtonEnabled(accessTo.length === 8);
  }, [accessTo]);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.access_to_the_blacklist")}`;
    setAccessTo("");
  }, []);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.access_to_the_blacklist")}`;
  }, [i18n.resolvedLanguage]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (accessTo.length === 8) {
      if (
        agencies.filter((agency: IProfile) => agency.id === Number(accessTo)).length > 0 &&
        Number(accessTo) !== profile.id &&
        filteredAccessToBlacklist.filter(
          (access: IBlacklistAccess) => access.agency_id === profile.id && access.access_to === Number(accessTo)
        ).length === 0
      ) {
        setIsConfirmModalShow(true);
        addBlacklistAccess({
          blacklistAccess: {
            agency_id: profile.id,
            access_to: Number(accessTo),
          } as IBlacklistAccess,
        });
      } else {
        setInfoMessage(t("profile.invalid_agency_id"));
        setIsMessageModalShow(true);
      }
    }
  };

  const handleMessageOnClick = () => {
    setIsMessageModalShow(false);
    window.scroll({ top: 0 });
  };

  const handleDeleteOnClick = (accessId: number) => {
    setDeletedAccess(accessId);
    setIsConfirmModalShow(true);
  };

  return (
    <div className={styles.content}>
      {filteredAccessToBlacklist.length > 0 && <div className={styles.title}>{t("profile.access_to_the_blacklist")}</div>}
      {filteredAccessToBlacklist.length > 0 && (
        <div className={`${styles.main_info} ${styles.full_width}`}>
          <table className={globalStyles.table}>
            <thead>
              <tr className={globalStyles.borderer}>
                <th style={{ width: "100%" }}>{t("profile.agency_id")}</th>
                <th className={globalStyles.borderer}>
                  <CloseIcon fill="#FFFFFF" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAccessToBlacklist.map((access: IBlacklistAccess) => (
                <tr>
                  <td style={{ width: "100%" }}>{String(access.access_to).padStart(8, "0")}</td>
                  <td className={globalStyles.borderer}>
                    <div className={globalStyles.close} onClick={() => handleDeleteOnClick(access.id)}>
                      <CloseIcon fill="#1B1B1B" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div />
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.title}>{t("profile.provide_access_to_the_blacklist")}</div>
        <div className={styles.main_info}>
          <form onSubmit={handleSubmit}>
            <div className={styles.input_field}>
              {t("profile.agency_id")}
              <input
                placeholder=""
                type="text"
                required
                minLength={8}
                maxLength={8}
                onChange={(event) => setAccessTo(event.target.value.trim())}
                value={accessTo}
              />
              <div className={globalStyles.required}>*</div>
            </div>
            <button type="submit" disabled={!isButtonEnabled}>
              {t("global.save")}
            </button>
          </form>
        </div>
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={handleMessageOnClick}
        isShow={isMessageModalShow}
      />
      <ConfirmMessageModal
        text={t("global.delete_blacklist_access_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={() => deleteBlacklistAccess({ id: deletedAccess })}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </div>
  );
};

export default AccessToBlacklist;
