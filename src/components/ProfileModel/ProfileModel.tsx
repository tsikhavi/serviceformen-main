/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import styles from "./ProfileModel.module.sass";

import ConfirmMessageModal from "../Modals/ConfirmMessageModal";
import MessageModal from "../Modals/MessageModal";
import { ModalType } from "../Modals/ModalType";
import UpdatePositionInfoModal from "../Modals/UpdatePositionInfoModal";

import { PhotoStatus } from "../../enums/photoStatus";
import { PhotoType } from "../../enums/photoType";
import { VideoStatus } from "../../enums/videoStatus";
import { IModel } from "../../types/model/model/model";
import { IPhoto } from "../../types/model/photo/photo";
import { IVideo } from "../../types/model/video/video";
import { IModelFeedback } from "../../types/model/modelFeedback/modelFeedback";
import { initServerStatus } from "../../types/main/serverStatus";
import { ServerStatusType } from "../../enums/serverStatusType";
import { IProposal } from "../../types/proposal/proposal";
import { ProposalStatus } from "../../enums/proposalStatus";
import { IProposalView } from "../../types/proposal/proposalView";

import { Close as CloseIcon } from "../../assets/Close";
import { Edit as EditIcon } from "../../assets/Edit";
import { PhotoCamera as PhotoIcon } from "../../assets/PhotoCamera";
import { VideoCamera as VideoIcon } from "../../assets/VideoCamera";
import { TarifTag as TarifIcon } from "../../assets/TarifTag";
import { Service as ServiceIcon } from "../../assets/Service";
import { Statistics as StatisticsIcon } from "../../assets/Statistics";
import { Feedback as FeedbackIcon } from "../../assets/Feedback";
import { Delete as DeleteIcon } from "../../assets/Delete";
import { Warning as WarningIcon } from "../../assets/Warning";
import { Order as OrderIcon } from "../../assets/Order";
import { ITarif } from "src/types/model/tarif/tarif";

interface IProfileModelProps {
  model: IModel;
}

const ProfileModel: React.FC<IProfileModelProps> = ({ model }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    updateModelEnable,
    setModelStatuses,
    getModels,
    setActiveModelSettingsSection,
    deleteModel,
    setModalType,
  } = useActions();
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const modelStatuses = useTypedSelector((state) => state.modelReducer.serverStatuses);
  const proposals = useTypedSelector((state) => state.proposalReducer.proposals);
  const proposalViews = useTypedSelector((state) => state.proposalReducer.proposalViews);
  const [isModelEnable, setIsModelEnable] = useState(model.is_enable);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);
  const [isOrdersNew, setIsOrdersNew] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);

  useEffect(() => {
    let modelProposals = [] as IProposal[];
    if (
      model.tarifs.length !== 0 &&
      model.tarifs.filter((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2).length !== 0
    ) {
      const tarif = model.tarifs.find((tarif: ITarif) => tarif.work_duration_id === 2 && tarif.meeting_place_id === 2);
      modelProposals = proposals.filter(
        (proposal: IProposal) =>
          proposal.status === ProposalStatus.Applyed &&
          proposal.min_price < tarif!.price &&
          proposal.max_price > tarif!.price
      );
    }
    const modelProposalsViews = proposalViews.filter((proposalView: IProposalView) => proposalView.model_id === model.id);
    if (modelProposals.length === 0) {
      setIsOrdersNew(false);
    } else {
      if (modelProposalsViews.length === 0) {
        setIsOrdersNew(true);
      } else {
        modelProposals.forEach((proposal: IProposal) => {
          if (
            modelProposalsViews.filter((proposalView: IProposalView) => proposalView.proposal_id === proposal.id).length ===
            0
          ) {
            setIsOrdersNew(true);
          }
        });
      }
    }
  }, [proposals]);

  useEffect(() => {
    if (model.is_enable !== isModelEnable) {
      updateModelEnable({ model_id: model.id, is_enable: isModelEnable });
    }
  }, [isModelEnable]);

  useEffect(() => {
    if (
      modelStatuses.deleteModel.status === ServerStatusType.Success ||
      modelStatuses.updateModelEnable.status === ServerStatusType.Success
    ) {
      setModelStatuses({ ...modelStatuses, updateModelEnable: initServerStatus(), deleteModel: initServerStatus() });
      getModels({ profile_id: profile.id });
    }
    if (modelStatuses.deleteModel.status === ServerStatusType.Error) {
      setInfoMessage(t(modelStatuses.deleteModel.error));
      setModelStatuses({ ...modelStatuses, deleteModel: initServerStatus() });
      setIsMessageModalShow(true);
    }
  }, [modelStatuses]);

  const handleConfirmDeleteOnClick = () => {
    deleteModel({ model: model });
    setIsConfirmModalShow(false);
  };

  function goModelSettings(section: number) {
    setActiveModelSettingsSection(section);
    navigate("/model_settings/" + String(model.id).padStart(8, "0"));
  }

  const handlerSetModelEnable = () => {
    if (
      model.photos.filter((photo: IPhoto) => photo.status === PhotoStatus.Applyed && photo.type === PhotoType.PublicPhoto)
        .length > 0 &&
      model.tarifs.length > 0 &&
      model.model_services.length > 0
    ) {
      setIsModelEnable(true);
    } else {
      setInfoMessage(t("model.model_enable_message"));
      setIsMessageModalShow(true);
    }
  };

  return (
    <div className={styles.model}>
      <div className={`${styles.part} ${styles.left}`}>
        <img
          className={styles.model_photo}
          src={`/uploads${
            model.photos.find((photo: IPhoto) => photo.is_main && photo.status === PhotoStatus.Applyed)?.photo_url
          }`}
          alt=""
        />
        <div>{t("model.last_position_update")}</div>
        <div>{new Date (model.last_position_update).toLocaleDateString() + ' ' + new Date (model.last_position_update).toLocaleTimeString()}</div>
        <div className={styles.part_bottom}>
          {/*model.is_vip ? (
            <div className={styles.vip_status}>{t("model.vip_status")}</div>
          ) : (
            <button className={styles.vip_button} type="button">
              VIP
            </button>
          )*/}
          <button
            type="button"
            disabled={model.positionsUpLeft < 1}
            onClick={() => {
              setModalType(ModalType.UpdatePositionInfo);
              setIsModalShow(true);
            }}
          >
            {t("model.improve_position")}
          </button>
        </div>
        <div>{t("model.update_this_hour_left") + ' ' + (model.positionsUpLeft || 6)}</div>
      </div>
      <div className={`${styles.part} ${styles.right}`}>
        <div className={styles.main}>
          <div className={styles.name}>{model.name}</div>
          {!model.is_payed ? (
            <div className={styles.no_check}>
              <CloseIcon fill="#8B8B8B" />
              {t("model.not_paid_for")}
            </div>
          ) : null}
        </div>
        {
          model.is_enable_by_moderator
            ? <div className={styles.toggle_wrapper}>
                <div
                  className={`${styles.toggle} ${!model.is_enable ? styles.active : ""}`}
                  onClick={() => setIsModelEnable(false)}
                >
                  {t("model.turned_off")}
                </div>
                <div className={`${styles.toggle} ${model.is_enable ? styles.active : ""}`} onClick={handlerSetModelEnable}>
                  {t("model.turned_on")}
                </div>
              </div>
            : <div className={`${styles.toggle_wrapper} ${styles.toggle_wrapper_disabled}`} title={t("profile.profile_disabled_by_moderator")}>
                  <div className={`${styles.toggle} ${styles.active}`}>
                    {t("model.turned_off")}
                  </div>
                  <div className={styles.toggle}>
                    {t("model.turned_on")}
                  </div>
              </div>
        }
        <div className={styles.links}>
          <div className={styles.link} onClick={() => goModelSettings(0)}>
            <EditIcon />
            {t("model.edit_profile")}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(1)}>
            <PhotoIcon />
            {t("model.photos")}
            {model.photos.filter(
              (photo: IPhoto) => photo.status > PhotoStatus.Rejected && photo.type === PhotoType.PublicPhoto
            ).length === 0 ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(2)}>
            <VideoIcon />
            {t("model.videos")}
            {model.videos.filter((video: IVideo) => video.status > VideoStatus.Rejected).length === 0 ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(3)}>
            <TarifIcon />
            {t("model.tariffs")}
            {model.tarifs.length === 0 ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(4)}>
            <ServiceIcon />
            {t("model.services")}
            {model.model_services.length === 0 ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(5)}>
            <StatisticsIcon />
            {t("model.statistics")}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(6)}>
            <FeedbackIcon />
            {t("model.feedbacks")}
            {model.model_feedbacks.filter((modelFeedback: IModelFeedback) => !modelFeedback.is_viewed).length > 0 ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
          <div className={styles.link} onClick={() => goModelSettings(7)}>
            <OrderIcon />
            {t("model.orders")}
            {isOrdersNew ? (
              <div className={styles.warning}>
                <WarningIcon />
              </div>
            ) : null}
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.id}>ID: {String(model.id).padStart(8, "0")}</div>
          <button className={styles.delete_button} type="button" onClick={() => setIsConfirmModalShow(true)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
      <ConfirmMessageModal
        text={t("global.delete_model_question")}
        okButtonText={t("global.delete")}
        handlerOkOnClick={handleConfirmDeleteOnClick}
        cancelButtonText={t("global.cancel")}
        isShow={isConfirmModalShow}
        setIsShow={setIsConfirmModalShow}
      />
      <MessageModal
        text={infoMessage}
        buttonText={t("global.ok")}
        handlerButtonClick={() => setIsMessageModalShow(false)}
        isShow={isMessageModalShow}
      />
      {isModalShow && <UpdatePositionInfoModal handlerButtonClick={() => setIsModalShow(false)} agency_id={model.agency_id} model_id={model.id} />}
    </div>
  );
};

export default ProfileModel;
