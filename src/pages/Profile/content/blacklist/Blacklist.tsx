/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../../hooks/useActions";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";

import globalStyles from "../../../../App.module.sass";
import styles from "../../Profile.module.sass";

import ConfirmMessageModal from "../../../../components/Modals/ConfirmMessageModal";
import MessageModal from "../../../../components/Modals/MessageModal";

import { IBlacklist } from "../../../../types/profile/blacklist/blacklist";
import { IBlacklistAccess } from "../../../../types/profile/blacklist/blacklistAccess";
import { ServerStatusType } from "../../../../enums/serverStatusType";
import { initServerStatus } from "../../../../types/main/serverStatus";

import { Close as CloseIcon } from "../../../../assets/Close";

const Blacklist = () => {
  const { t, i18n } = useTranslation();
  const { deleteBlacklist, getBlacklist, setBlacklistStatuses } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const blacklist = useTypedSelector((state) => state.blacklistReducer.blacklist);
  const blacklistAccess = useTypedSelector((state) => state.blacklistReducer.blacklistAccess);
  const blacklistStatuses = useTypedSelector((state) => state.blacklistReducer.serverStatuses);
  const [agencyBlacklist, setAgencyBlacklist] = useState(
    blacklist.filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === profile.id)
  );
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [deletedBlacklistItem, setDeletedBlacklistItem] = useState(0);
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.blacklist")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("profile.profile")} | ${t("profile.blacklist")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    setAgencyBlacklist(blacklist.filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === profile.id));
  }, [blacklist]);

  useEffect(() => {
    if (blacklistStatuses.deleteBlacklist.status === ServerStatusType.Success) {
      setBlacklistStatuses({ ...blacklistStatuses, deleteBlacklist: initServerStatus() });
      setIsConfirmModalShow(false);
      getBlacklist();
    }
    if (blacklistStatuses.deleteBlacklist.status === ServerStatusType.Error) {
      setInfoMessage(blacklistStatuses.deleteBlacklist.error);
      setIsConfirmModalShow(false);
      setIsMessageModalShow(true);
      setBlacklistStatuses({ ...blacklistStatuses, deleteBlacklist: initServerStatus() });
    }
  }, [blacklistStatuses]);

  const handleDeleteOnClick = (blacklistItemId: number) => {
    setDeletedBlacklistItem(blacklistItemId);
    setIsConfirmModalShow(true);
  };

  return (
    <div className={styles.content}>
      <div className={styles.title}>{t("profile.blacklist")}</div>
      <div className={`${styles.main_info} ${styles.full_width}`}>
        {agencyBlacklist.length > 0 && <div className={styles.agency}>{t("profile.this_agency")}</div>}
        {agencyBlacklist.length > 0 && (
          <table className={globalStyles.table}>
            <thead>
              <tr className={globalStyles.borderer}>
                <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                <th className={globalStyles.borderer} style={{ width: "65%" }}>
                  {t("profile.description")}
                </th>
                <th className={globalStyles.borderer}>
                  <CloseIcon fill="#FFFFFF" />
                </th>
              </tr>
            </thead>
            <tbody>
              {agencyBlacklist.map((blacklist_item: IBlacklist) => (
                <tr>
                  <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                  <td className={globalStyles.borderer} style={{ width: "65%" }}>
                    {blacklist_item.description}
                  </td>
                  <td className={globalStyles.borderer}>
                    <div className={globalStyles.close} onClick={() => handleDeleteOnClick(blacklist_item.id)}>
                      <CloseIcon fill="#1B1B1B" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {blacklistAccess.map((access: IBlacklistAccess) => {
          if (
            access.access_to === profile.id &&
            blacklist.filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.access_to).length > 0
          ) {
            return (
              <div className={`${styles.main_info} ${styles.full_width}`}>
                <div className={styles.agency}>
                  {t("profile.agency_with_id")} {String(access.agency_id).padStart(8, "0")}
                </div>
                <table className={globalStyles.table}>
                  <thead>
                    <tr className={globalStyles.borderer}>
                      <th style={{ width: "35%" }}>{t("profile.phone_number")}</th>
                      <th className={globalStyles.borderer} style={{ width: "65%" }}>
                        {t("profile.description")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {blacklist
                      .filter((blacklist_item: IBlacklist) => blacklist_item.agency_id === access.agency_id)
                      .map((blacklist_item: IBlacklist) => (
                        <tr>
                          <td style={{ width: "35%" }}>{blacklist_item.phone_number}</td>
                          <td className={globalStyles.borderer} style={{ width: "65%" }}>
                            {blacklist_item.description}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            );
          }
        })}
      </div>
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
      <ConfirmMessageModal
        text={t("global.delete_blacklist_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={() => deleteBlacklist({ id: deletedBlacklistItem })}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
    </div>
  );
};

export default Blacklist;
