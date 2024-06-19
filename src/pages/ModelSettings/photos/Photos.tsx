/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

import pageStyles from "../ModelSettings.module.sass";
import styles from "./Photos.module.sass";

import ConfirmMessageModal from "../../../components/Modals/ConfirmMessageModal";
import MessageModal from "../../../components/Modals/MessageModal";

import PhotoCropModal from "../../../components/Modals/PhotoCropModal";

import { ModalType } from "../../../components/Modals/ModalType";

import { IPhoto } from "../../../types/model/photo/photo";
import { PhotoStatus } from "../../../enums/photoStatus";
import { PhotoType } from "../../../enums/photoType";
import { ServerStatusType } from "../../../enums/serverStatusType";
import { initServerStatus } from "../../../types/main/serverStatus";

import { Close as CloseIcon } from "../../../assets/Close";
import { Delete as DeleteIcon } from "../../../assets/Delete";
import { Image as ImageIcon } from "../../../assets/Image";

const Photos = () => {
  const { t, i18n } = useTranslation();
  const {
    uploadCheckPhoto,
    uploadTmpPublicPhoto,
    updateMainPhoto,
    deletePhoto,
    setFileStatuses,
    setPhotoStatuses,
    setIsModalShow,
    setModalType,
    getModels,
    setCheckPhotoProgress,
    setPublicPhotoProgress,
  } = useActions();
  const checkPhotoPicker = useRef<HTMLInputElement>(null);
  const publicPhotoPicker = useRef<HTMLInputElement>(null);
  const profile = useTypedSelector((state) => state.profileReducer.profile);
  const windowSize = useTypedSelector((state) => state.mainReducer.windowSize);
  const model = useTypedSelector((state) => state.modelReducer.model);
  const fileStatuses = useTypedSelector((state) => state.fileReducer.serverStatuses);
  const photoStatuses = useTypedSelector((state) => state.photoReducer.serverStatuses);
  const checkPhotoProgress = useTypedSelector((state) => state.fileReducer.checkPhotoProgress);
  const publicPhotoProgress = useTypedSelector((state) => state.fileReducer.publicPhotoProgress);
  const [filename, setFilename] = useState("");
  const [deletedPhoto, setDeletedPhoto] = useState({ id: -1 } as IPhoto);
  const [isConfirmModalShow, setIsConfirmModalShow] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [isMessageModalShow, setIsMessageModalShow] = useState(false);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.photos")}`;
  }, []);

  useEffect(() => {
    document.title = `${t("model.model")} | ${t("model.photos")}`;
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (
      fileStatuses.uploadCheckPhoto.status === ServerStatusType.Success ||
      photoStatuses.updateMainPhoto.status === ServerStatusType.Success
    ) {
      setPublicPhotoProgress(-1);
      setCheckPhotoProgress(-1);
      setFileStatuses({ ...fileStatuses, uploadCheckPhoto: initServerStatus() });
      setPhotoStatuses({ ...photoStatuses, updateMainPhoto: initServerStatus() });
      getModels({ profile_id: profile.id });
    }
    if (
      fileStatuses.uploadTmpPublicPhoto.status === ServerStatusType.Success &&
      fileStatuses.uploadPublicPhoto.status === ServerStatusType.None
    ) {
      setModalType(ModalType.PhotoCrop);
      setIsModalShow(true);
      setPublicPhotoProgress(-1);
    }
    if (
      fileStatuses.uploadPublicPhoto.status === ServerStatusType.Error ||
      fileStatuses.uploadCheckPhoto.status === ServerStatusType.Error ||
      fileStatuses.uploadTmpPublicPhoto.status === ServerStatusType.Error
    ) {
      setPublicPhotoProgress(-1);
      setCheckPhotoProgress(-1);
      if (fileStatuses.uploadPublicPhoto.error !== "") {
        setInfoMessage(t(fileStatuses.uploadPublicPhoto.error));
        setFileStatuses({
          ...fileStatuses,
          uploadPublicPhoto: initServerStatus(),
        });
      }
      if (fileStatuses.uploadTmpPublicPhoto.error !== "") {
        setInfoMessage(t(fileStatuses.uploadTmpPublicPhoto.error));
        setFileStatuses({
          ...fileStatuses,
          uploadTmpPublicPhoto: initServerStatus(),
        });
      }
      if (fileStatuses.uploadCheckPhoto.error !== "") {
        setInfoMessage(t(fileStatuses.uploadCheckPhoto.error));
        setFileStatuses({
          ...fileStatuses,
          uploadCheckPhoto: initServerStatus(),
        });
      }
      setIsMessageModalShow(true);
    }
    if (photoStatuses.deletePhoto.status === ServerStatusType.Success) {
      setPhotoStatuses({ ...photoStatuses, deletePhoto: initServerStatus() });
      getModels({ profile_id: profile.id });
    }
  }, [fileStatuses, photoStatuses]);

  const handleCheckOnChange = async (event) => {
    uploadCheckPhoto({
      file: event.target.files[0],
      model_id: model.id,
      onUploadProgress: (data) => {
        setCheckPhotoProgress(Math.round(100 * (data.loaded / data.total!)));
      },
    });
    event.target.value = "";
  };

  const handlePublicOnChange = async (event) => {
    const fileNameArr = event.target.files[0].name.split(".");
    const fileNameStr = String(model.id) + "mpb" + String(Date.now()) + "." + fileNameArr[fileNameArr.length - 1];
    setFilename(fileNameStr);
    uploadTmpPublicPhoto({
      file: event.target.files[0],
      filename: fileNameStr,
      onUploadProgress: (data) => {
        setPublicPhotoProgress(Math.round(100 * (data.loaded / data.total!)));
      },
    });
    event.target.value = "";
  };

  const handleDeleteOnClick = (photo: IPhoto) => {
    setDeletedPhoto(photo);
    setIsConfirmModalShow(true);
  };

  const handleConfirmDeleteOnClick = () => {
    deletePhoto({ photo: deletedPhoto });
    setIsConfirmModalShow(false);
  };

  const handleChangeMainPhoto = (photo: IPhoto) => {
    updateMainPhoto({ model_id: model.id, photo_id: photo.id });
  };

  return (
    <div className={pageStyles.content}>
      <div className={`${pageStyles.title} ${pageStyles.media}`}>
        {windowSize.innerWidth < 1201 && !model.is_verified ? (
          <div className={pageStyles.no_check + " " + pageStyles.disabled}>
            <CloseIcon fill="#8B8B8B" />
            {t("model.not_verified")}
          </div>
        ) : null}
        {t("model.photos")}
        {windowSize.innerWidth < 1201 && !model.is_verified ? (
          <div className={pageStyles.no_check}>
            <CloseIcon fill="#8B8B8B" />
            {t("model.not_verified")}
          </div>
        ) : null}
      </div>
      <div className={styles.photos_container}>
        {!model.is_verified &&
        model.photos.filter((photo: IPhoto) => photo.status === PhotoStatus.OnCheck && photo.type === PhotoType.CheckPhoto)
          .length === 0 ? (
          <>
            <input
              type="file"
              id="file"
              onChange={handleCheckOnChange}
              accept="image/png, image/jpeg"
              ref={checkPhotoPicker}
            />
            <button
              type="button"
              onClick={() => {
                if (checkPhotoPicker.current !== null && checkPhotoProgress === -1) {
                  checkPhotoPicker.current!.click();
                }
              }}
            >
              {checkPhotoProgress === -1
                ? t("model.get_the_verified_status")
                : `${t("model.loading")}... (${checkPhotoProgress}%)`}
            </button>
          </>
        ) : null}
        {model.photos.filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status < PhotoStatus.Applyed)
          .length > 0 ? (
          <div className={styles.container}>
            {t("model.photo_for_verification")}
            <div className={styles.photos_wrapper}>
              {model.photos
                .filter((photo: IPhoto) => photo.type === PhotoType.CheckPhoto && photo.status < PhotoStatus.Applyed)
                .sort((photoOne: IPhoto, photoTwo: IPhoto) => (Number(photoOne.id) > Number(photoTwo.id) ? 1 : -1))
                .map((photo: IPhoto) => (
                  <div
                    className={`${styles.photo_item} ${photo.is_main ? styles.main : ""} ${
                      photo.status === PhotoStatus.OnCheck ? styles.on_check : ""
                    } ${photo.status === PhotoStatus.Rejected ? styles.rejected : ""}`}
                  >
                    <img src={`/uploads${photo.photo_url}`} alt="" />
                    {photo.status === PhotoStatus.OnCheck ? (
                      <div className={styles.check_photo}>{t("model.awaiting_verification")}</div>
                    ) : null}
                    {photo.status === PhotoStatus.Rejected ? (
                      <div className={styles.rejected_photo}>{t("model.rejected_verification")}</div>
                    ) : null}
                    <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(photo)}>
                      <DeleteIcon />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
        <div className={styles.container}>
          {t("model.public_photo")}
          <div className={styles.photos_wrapper}>
            {model.photos
              .filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto)
              .sort((photoOne: IPhoto, photoTwo: IPhoto) => (Number(photoOne.id) > Number(photoTwo.id) ? 1 : -1))
              .map((photo: IPhoto) => (
                <div
                  className={`${styles.photo_item} ${photo.is_main ? styles.main : ""} ${
                    photo.status === PhotoStatus.OnCheck ? styles.on_check : ""
                  } 
                } ${photo.status === PhotoStatus.Rejected ? styles.rejected : ""}`}
                >
                  <img src={`/uploads${photo.photo_url}`} alt="" />
                  {photo.is_main && photo.status === PhotoStatus.Applyed ? (
                    <div className={styles.main_photo}>{t("model.the_main_photo")}</div>
                  ) : null}
                  {!photo.is_main && photo.status === PhotoStatus.Applyed ? (
                    <button type="button" onClick={() => handleChangeMainPhoto(photo)}>
                      {t("model.make_the_main_photo")}
                    </button>
                  ) : null}
                  {photo.status === PhotoStatus.OnCheck ? (
                    <div className={styles.check_photo}>{t("model.awaiting_verification")}</div>
                  ) : null}
                  {photo.status === PhotoStatus.Rejected ? (
                    <div className={styles.rejected_photo}>{t("model.rejected_media")}</div>
                  ) : null}
                  <button className={styles.delete_button} type="button" onClick={() => handleDeleteOnClick(photo)}>
                    <DeleteIcon />
                  </button>
                </div>
              ))}
            {model.photos.filter((photo: IPhoto) => photo.type === PhotoType.PublicPhoto).length > 30 ? null : (
              <>
                <input
                  type="file"
                  id="file"
                  onChange={handlePublicOnChange}
                  accept="image/png, image/jpeg"
                  ref={publicPhotoPicker}
                />
                <div
                  className={styles.add}
                  onClick={() => {
                    if (publicPhotoPicker.current !== null && publicPhotoProgress === -1) {
                      publicPhotoPicker.current!.click();
                    }
                  }}
                >
                  <ImageIcon />
                  {publicPhotoProgress === -1
                    ? t("model.select_a_photo")
                    : `${t("model.loading")}... (${publicPhotoProgress}%)`}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <PhotoCropModal filename={filename} />
      <ConfirmMessageModal
        text={t("global.delete_photo_question")}
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
    </div>
  );
};

export default Photos;
